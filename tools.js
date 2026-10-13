$(document).ready(function () {
    Pageload();
    $("#dt_from").datepicker({
        dateFormat: "mm-dd-yy",
        maxDate: 0,
        changeMonth: true,
        changeYear: true,
        yearRange: "1900:2100",
        onSelect: function (date) {
            $("#dt_to").datepicker("option", "minDate", date);
        }
    });
    $("#dt_from").mask("00-00-0000", {
        placeholder: "MM-DD-YYYY"
    });
    $("#dt_to").datepicker({
        dateFormat: "mm-dd-yy",
        maxDate: 0,
        changeMonth: true,
        changeYear: true,
        yearRange: "1900:2100"
    });
    $("#dt_to").mask("00-00-0000", {
        placeholder: "MM-DD-YYYY"
    });
    SetDefaultFormButton('frm_popup_mrgDoc', 'submit_mrgdoc');
});

function updateCount() {
    var n = $("#docList .doc-row").length;
    $("#resultCount").text(
        n + (n === 1 ? " file" : " files")
    );
    if (n === 0) {
        $("#pdfPreview")
            .hide()
            .attr("src", "");
        $("#previewEmpty").show();
        $("#previewTitle").text("Preview");
    }
}

function SelectDoc(el) {
    $(".doc-row").removeClass("active");
    $(el).addClass("active");
    var name = $(el).data("name");
    var id = $(el).data("id");
    var newUrl =
        documentPageConfig.viewFileUrl +
        "?id=" + encodeURIComponent(id) +
        "#toolbar=0&navpanes=0";
    $("#previewTitle").text(name);
    $("#previewEmpty").hide();
    ShowLoading();
    var iframe = $("#pdfPreview");
    iframe
        .off("load error")
        .on("load", function () {
            HideLoading();
        })
        .on("error", function () {
            HideLoading();
            iframe.attr("src", "about:blank");
        })
        .attr("src", newUrl)
        .show();
    return false;
}
function RemoveDoc(event, icon) {
    event.stopPropagation();
    var row = $(icon).closest(".doc-row");
    var wasActive = row.hasClass("active");
    row.remove();
    updateCount();
    if (wasActive) {
        var first = $("#docList .doc-row").first();
        if (first.length) {
            SelectDoc(first);
        }
    }
    return false;
}
function SearchDocuments() {
    HideError("doc_filter_err");
    if (IsBlank($("#filter1").val())) {
        ShowErrorMessage(
            "doc_filter_err",
            "Filter 1 is required."
        );
        ScrollUpToElement("doc_filter_err");
        return false;
    }
    var objJson = CreateJsonByForm("frm_search");
    HttpPostCallback(
        documentPageConfig.searchFilesUrl,
        objJson,
        "doc_filter_err",
        function (response) {
            $("#docList").html(response);
            updateCount();
            return false;
        }
    );
    return false;
}
function ClearFilters() {
    $("#filter1, #filter2, #filter3, #dt_from, #dt_to").val("");
    $("#docList").html("");
    updateCount();
    return false;
}
function OpenMergePopup() {
    HideError("doc_filter_err");
    HideError(documentPageConfig.errorId);
    if ($("#docList .doc-row").length === 0) {
        ShowErrorMessage(
            "doc_filter_err",
            "No PDFs left to merge"
        );
        ScrollUpToElement("doc_filter_err");
        return false;
    }
    $("#merge_filename").val("");
    $("#" + documentPageConfig.popupDivId).modal("show");
    return false;
}
function MrgdocSubmit() {
    HideError("doc_filter_err");
    HideError(documentPageConfig.errorId);
    var name = $.trim($("#merge_filename").val());
    if (!name) {
        ShowErrorMessage(
            documentPageConfig.errorId,
            "Please enter a file name."
        );
        return false;
    }
    if (!name.toLowerCase().endsWith(".pdf")) {
        name = name + ".pdf";
    }
    var ids = [];
    $("#docList .doc-row").each(function () {
        ids.push($(this).data("id"));
    });
    var obj = {
        file_name: name,
        ids: ids
    };
    HttpPostCallback(
        documentPageConfig.mergePdfsUrl,
        JSON.stringify(obj),
        "doc_filter_err",
        function () {
            ClosePopup(documentPageConfig.popupDivId);
            ShowSuccess();
            ClearFilters();
        }
    );
    return false;
}