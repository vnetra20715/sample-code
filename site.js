function CreateJsonByForm(formId) {
    var jsonObject = {};

    // Select all input, textarea, and select elements within the form
    $('#' + formId).find('input, textarea, select').each(function () {
        var id = $(this).attr('id'); // Get the ID of the element
        var value = $(this).val();  // Get the value of the element
        var type = $(this).attr('type'); 
        //if (type === 'checkbox' || type === 'radio') {
            //return; // Skip checkboxes, continue to next element
        //}
        if (type === 'checkbox') {
            if ($(this).is(':checked')) {
                value = $(this).attr('checkedVal');
            } else {
                value = $(this).attr('uncheckedVal');
            }
        }
        if (id) { // Only add to JSON if the element has an ID
            if ($(this).attr('numtype') === 'yes') {
                jsonObject[id] = IntNull(value);
            }
            else {
                jsonObject[id] = value;
            }
        }
    });

    return JSON.stringify(jsonObject);
}

//function GetDialog(keyword) {
//    var tmpKey = "";
//    var tmp = "";

//    if (keyword) {
//        tmpKey = "_" + keyword;
//        tmp = keyword.toLowerCase().replace(/\b\w/g, function (c) {
//            return c.toUpperCase();
//        });
//    }

//    return {
//        key: keyword ? keyword.toLowerCase() : "",
//        containerId: "div_popcon" + tmpKey,
//        errorId: "div_error" + tmpKey,
//        formId: "frm_popup" + tmpKey,
//        insertUrl: tmp + "Add",
//        updateUrl: tmp + "Update",
//        popupButtonId: "btn_pop" + tmpKey,
//        popupDivId: "div_popdv" + tmpKey,
//        bodyDivId: "div_pb" + tmpKey,
//        titleId: "div_title" + tmpKey,
//        onSubmit: tmp + "Submit()",
//        onEdit: tmp + "Edit()",
//        submitButtonId: "submit_" + tmp.toLowerCase(),
//    };
//}

function SetDefaultFormButton(formId, buttonId) {
    $("#" + formId).on("keydown", "input, select", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            $("#" + buttonId).trigger("click");
        }
    });
}

function ScrollUpToElement(id) {
    var element = $("#" + id);

    if (!element.length) return;

    var topOffset = 60; // fixed menu height
    var extraSpace = 10;

    $("html, body").animate({
        scrollTop: element.offset().top - topOffset - extraSpace
    }, 500);
}

function EndsWithAny(suffixes, inputString) {
    // Loop through each suffix in the array
    for (let suffix of suffixes) {
        // Check if the inputString ends with the current suffix
        if (inputString.endsWith(suffix)) {
            return true; // Return true if any suffix matches
        }
    }
    return false; // Return false if none match
}


function GetFileIcon(fileName) {
    let ext = fileName.split('.').pop().toLowerCase();
    return GetFileIconFromExt(ext);
}

function GetFileIconFromExt(ext) {
    switch (ext) {
        // 📝 Documents & Text
        case "pdf": return "fa-solid fa-file-pdf text-danger"; // Red for PDF
        case "doc":
        case "docx":
        case "odt": return "fa-solid fa-file-word text-primary"; // Blue for Word documents
        case "xls":
        case "xlsx":
        case "csv":
        case "ods": return "fa-solid fa-file-excel text-success"; // Green for Spreadsheets
        case "ppt":
        case "pptx":
        case "odp": return "fa-solid fa-file-powerpoint text-warning"; // Orange for Presentations
        case "txt":
        case "log":
        case "rtf": return "fa-solid fa-file-lines text-secondary"; // Gray for Text files

        // 🖼️ Images
        case "jpg":
        case "jpeg":
        case "png":
        case "gif":
        case "bmp":
        case "tiff":
        case "svg":
        case "webp": return "fa-solid fa-file-image text-info"; // Light Blue for Images

        // 💻 Code/Scripts
        case "html":
        case "htm": return "fa-brands fa-html5 text-orange"; // HTML (fa-brands for brand icons)
        case "css": return "fa-brands fa-css3-alt text-primary"; // CSS
        case "js":
        case "ts":
        case "jsx":
        case "tsx": return "fa-brands fa-js text-warning"; // JavaScript/TypeScript
        case "cs":
        case "cpp":
        case "h":
        case "java":
        case "py":
        case "php": return "fa-solid fa-file-code text-dark"; // General Code
        case "json":
        case "xml":
        case "md": return "fa-solid fa-file-alt text-muted"; // Data/Markup

        // 🎵 Media
        case "mp3":
        case "wav":
        case "flac": return "fa-solid fa-file-audio text-info"; // Audio files
        case "mp4":
        case "avi":
        case "mov":
        case "webm": return "fa-solid fa-file-video text-danger"; // Video files

        // 📦 Archives & Executables
        case "zip":
        case "rar":
        case "7z":
        case "tar": return "fa-solid fa-file-zipper text-dark"; // Archive/Compressed
        case "exe":
        case "dll":
        case "bat": return "fa-solid fa-gear text-primary"; // Executable/System file

        // ❓ Default
        default: return "fa-solid fa-file text-secondary"; // Generic file icon
    }
}


function ShowSubmitProgress(key) {
    var keyId = "#" + "submit_progress_" + key;
    $(keyId).show();
}

function HideSubmitProgress(key) {
    var keyId = "#" + "submit_progress_" + key;
    $(keyId).hide();
}

function CreateObjectByForm(formId) {
    var jsonObject = {};

    // Select all input, textarea, and select elements within the form
    $('#' + formId).find('input, textarea, select').each(function () {
        var id = $(this).attr('id'); // Get the ID of the element
        var value = $(this).val();  // Get the value of the element
        var type = $(this).attr('type');
        
        if (type === 'checkbox') {
            if ($(this).is(':checked')) {
                value = $(this).attr('checkedVal');
            } else {
                value = $(this).attr('uncheckedVal');
            }
        }
        if (id) { // Only add to JSON if the element has an ID
            if ($(this).attr('numtype') === 'yes') {
                jsonObject[id] = IntNull(value);
            }
            else {
                jsonObject[id] = value;
            }
        }
    });

    return jsonObject;
}

function ShowOther(ctlId) {
    var otherId = "#" + ctlId + "_other";
    var otherVal = $(otherId).val();
    var ctl = document.getElementById(ctlId);
    SetOther(ctl, ctlId);
    $(otherId).val(otherVal);
}

function SetOther(ctl, ctlId) {
    var otherId = "#" + ctlId + "_other";
    var td = ".td_" + ctlId;
    if ($(ctl).find("option:selected").text() == "Other") {
        $(otherId).show();
        $(td).css("width", "50%");
        $(otherId).focus();
    } else {
        $(otherId).hide();
        $(td).css("width", "100%");
    }
    $(otherId).val("");
}

function FlickerBackground(id, flickerColor, duration, interval) {
    const elements = $(id); // Select the elements with the given class name
    const originalColor = elements.css('background-color'); // Save the original color

    let isOriginal = true; // Track which color to set
    const flicker = setInterval(() => {
        elements.css('background-color', isOriginal ? flickerColor : originalColor);
        isOriginal = !isOriginal; // Toggle the color state
    }, interval);

    setTimeout(() => {
        clearInterval(flicker); // Stop the flicker effect
        elements.css('background-color', originalColor); // Reset to the original color
    }, duration);
}

function RemoveItemById(id) {
    $("#" + id).remove();
    return false;
}

function IsImageSizeOk(fileCtl, sizeMb, errorId) {
    let ctl = `#${fileCtl}`;
    if ($(ctl).prop("files").length > 0) {
        let file = $(ctl).prop("files")[0];
        let fileSize = file.size / (1024 * 1024);
        if (fileSize > sizeMb) {
            ShowErrorMessage(errorId, `You cannot upload file more than ${sizeMb} MB.`);
            return false;
        }
    }
    return true;
}


function PhotoSelected(fileCtl, photoDialogKey, photoDialogPopupButtonId, errorId) {
    let ctl = `#${fileCtl}`;
    HideError(errorId);
    var imgId = GetUploadImagePlaceholderId(photoDialogKey);
    var fi = document.getElementById(fileCtl);
    if (fi.files.length > 0) {
        let file = $(ctl).prop("files")[0];
        if (file) {
            $(`#${imgId}`).attr("src", URL.createObjectURL(file));
            $(`#${photoDialogPopupButtonId}`).click();
        }
    }
    return false;
}


function ShowImage(fileCtl, imgId) {
    let ctl = `#${fileCtl}`;
    var fi = document.getElementById(fileCtl);
    if (fi.files.length > 0) {
        let file = $(ctl).prop("files")[0];
        if (file) {
            $(`#${imgId}`).attr("src", URL.createObjectURL(file));
        }
    }
    return false;
}


function SetDefaultPicture(fileCtl, imgId, defaultImage) {
    $(`#${fileCtl}`).val("");
    $(`#${imgId}`).attr("src", defaultImage);
    return false;
}


function ShowFileSelect(fileCtl) {
    let ctl = `#${fileCtl}`;
    $(ctl).val("");
    document.getElementById(fileCtl).click();
    return false;
}


function GetImageFileToUpload(fileCtl) {
    let ctl = `#${fileCtl}`;
    if ($(ctl).prop("files").length > 0) {
        return $(ctl).prop("files")[0];
    }
    return null;
}

function SetCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Set expiration date
        expires = "; expires=" + date.toUTCString(); // Convert to UTC string
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/"; // Set the cookie
}

// Function to get a cookie by name
function GetCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';'); // Split all cookies by semicolon
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim(); // Remove any leading or trailing whitespace
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length); // Return the cookie value
        }
    }
    return null; // Return null if the cookie is not found
}

function More(code, height, divId) {
    $("#dvs_" + code).hide();
    $("#dvl_" + code).show();

    // Get full height by temporarily setting auto
    const $div = $("#" + divId);
    $div.css({
        'height': 'auto',
        'overflow': 'visible'
    });

    const fullHeight = $div.outerHeight(); // store full height
    $div.css('height', height + 'px'); // reset to old height before animating

    // Animate to full height
    $div.animate({
        height: fullHeight
    }, 300, function () {
        $div.css('height', 'auto'); // allow content to expand naturally
    });

    return false;
}

function Less(code, height, divId) {
    $("#dvs_" + code).show();
    $("#dvl_" + code).hide();

    const $div = $("#" + divId);
    const currentHeight = $div.outerHeight();

    // Set height before animating
    $div.css({
        'height': currentHeight,
        'overflow': 'hidden'
    });

    // Animate to collapsed height
    $div.animate({
        height: height + 'px'
    }, 300);

    return false;
}


function ShowMore(code) {
    $("#dvs_"+code).hide();
    $("#dvl_"+code).show();
    return false;
}

function ShowLess(code) {
    $("#dvs_" + code).show();
    $("#dvl_"+code).hide();
    return false;
}
function ExpandMenu(mnu) {
    var cltMnu = $("#" + mnu);
    var vx = cltMnu.is(":visible");
    if (vx == false) {
        CloseOtherMenus(mnu);
    }
    cltMnu.slideToggle(200, function () {
        var arrid = "arr-" + mnu;
        var vi = cltMnu.is(":visible");
        if (vi == true) {
            $('#' + arrid).css({
                'display': 'inline-block',
                'transform': 'rotate(180deg)'
            });
        }
        else {
            $('#' + arrid).css({
                'display': 'inline-block',
                'transform': 'rotate(0deg)'
            });
        }
    });
    SetMenuRightMargine();
    return false;
}

function IsAllNotBlank(ids, errors, errorId) {
    var str_array = ids.split(',');
    var str_errror = errors.split(',');
    for (var i = 0; i < str_array.length; i++) {
        var blank = IsBlank($("#" + str_array[i]).val());
        if (blank) {
            ShowErrorMessage(errorId, str_errror[i]);
            return false;
        }
    }
    return true;
}

function SetDatePickerValue(id, defaultDateStr) {
    if (IsBlank(defaultDateStr) == false) {
        var parts = defaultDateStr.split("-");
        var defaultDate = new Date(parts[2], parts[0] - 1, parts[1]);
        $("#" + id).datepicker("setDate", defaultDate);
    }
}

function SetTitle(title) {
    var title = "@AppConstant.AppName" + " :: " + title;
    document.title = title;
}

function HasVerticalScrollbar(ctlId) {
    var div = $("#" + ctlId);
    return div.scrollHeight > div.innerHeight();
}

function SetMenuRightMargine() {
    var divHasScrollbar = HasVerticalScrollbar("left-menu");
    if (divHasScrollbar) {
        $("#left-menu").addClass("menu-right-mrg");
    }
    else {
        $("#left-menu").addClass("menu-right-mrg");
    }
}

function SetDatePickerExt(ctlId) {
    var cxId = "#" + ctlId;
    $(cxId).mask('00-00-0000');
    $(cxId).datepicker({
        autoclose: true,
        todayHighlight: true,
         dateFormat: "mm-dd-yy",
        format: "mm-dd-yy",
        autoUpdateInput: false,
        changeMonth: true,
        changeYear: true,
        yearRange: "1900:2099"
    });
}

function GetCurrentDateString() {
    const currentDate = new Date();

    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    const year = currentDate.getFullYear();

    return `${month}-${day}-${year}`;
}

function GetDateStringWithOffset(days) {
    const currentDate = new Date();

    // Add or subtract the days
    currentDate.setDate(currentDate.getDate() + days);

    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    const year = currentDate.getFullYear();

    return `${month}-${day}-${year}`;
}

function SetTimePickerExt(ctlId, defTime) {
    var cxId = "#" + ctlId;
    $(cxId).mask('00:00 AA');
    if (IsBlank(defTime)) {
        defTime = '10:00 AM';
    }
    $(cxId).timepicker({
        timeFormat: 'hh:mm p',
        interval: 15,
        //minTime: '10',
        //maxTime: '6:00pm',
        //startTime: '10:00',
        defaultTime: defTime,
        dynamic: false,
        dropdown: true,
        scrollbar: true
    });

    $(cxId).on("input", function () {
        this.value = this.value.toUpperCase();
    });
}


function ShowDatePicker(ctlId) {
    $("#" + ctlId).datepicker("show");
    $("#" + ctlId).focus();;
}

function ShowTimePicker(ctlId) {
    $("#" + ctlId).focus();
}

function CloseOtherMenus(mnu) {
    var visibleItems = $('.submenu-div:visible');
    visibleItems.each(function () {
        var id = $(this).attr("id");
        if (id != mnu) {
            ExpandMenu(id);
        }
    });
}

function LoadScreenSetMenu(menu, url) {
    SetMenuSelected(menu);
    LoadScreen(url);
    return false;
}
function Pageload() {
    var page_id = "#page-title";
    if (IsFoundById(page_id)) {
        document.title = $(page_id).val();
    }
    else {
        document.title = "Untitled Page";
        window.location = "/error/missingtitle"
    }
    $('[data-toggle="tooltip"]').tooltip();
    
    const url = new URL(window.location.href);
    const path = url.pathname + url.search + url.hash;
    var element = $('.micon[url="' + path + '"]').first();

    if (element.length == false) {
        element = $('.micon[url="' + $("#url-value").val() + '"]').first();
    }

    if (element.length) {
        if ($(element).hasClass('fa-solid') == false) {
            var id = $(element).attr("id").replace("ic-", "");
            MenuClick(id, "");
        }
    }
    else {
        console.log("Menu element not found.");
    }
}




function CtlVal(id) {
    return $("#" + id).val();
}

function MenuClick(id, url) {
    $(".micon").removeClass("fa-solid");
    $(".micon").addClass("fa-light");

    $("#ic-" + id).removeClass("fa-light");
    $("#ic-" + id).addClass("fa-solid");

    $(".mtbl").removeClass("menu-item-tbl-sel");
    $("#tbl-" + id).addClass("menu-item-tbl-sel");

    if (IsBlank(url) == false) {
        return LoadScreen(url);
    }
    $(".dd-ext ul:visible").hide();
}

function LoadScreen(url) {
    if (IsBlank(url)) {
        return false;
    }
    var title = document.title;
    LoadScreenFromUrl(url);
    history.pushState({ page: 1 }, title, url);
    window.event.stopPropagation();
    return false;
}   

function LoadScreenFromUrl(url) {
    try {
        ShowLoading();
        $.ajax({
            type: "GET",
            url: url,
            headers: {
                'spa': 'yes'
            },
            success: function (recData) {
                var found = $(recData).find("#app-body").html();
                if (found == null || found == NaN || found == undefined) {
                    window.location = "/login";
                    return;
                }
                //$("#app-body").html(found);
                //HideLoading();
                $("#app-body").stop(true, true).fadeOut(400, function () {
                    $(this).html(found).fadeIn(500);
                    HideLoading();
                });
            },
            error: function (xhr, textStatus, error) {
                HandleHttpError(xhr.status, xhr.responseText, "-no-err-");
            }
        });
    }
    catch (err) {
        HandleError(err.message);
    }
    return false;
}

function WindowResize() {
   
}

function GetUploadImagePlaceholderId(key) {
    return "img_plac_" + key;
}

function ValidationErrorPlacement(error, element) {
    error.addClass("val-style");
    if (element.prop("type") === "checkbox") {
        error.insertAfter(element.parent("label"));
    } else {
        error.insertAfter(element);
    }
}

function ClosePopup(id) {
    $("#" + id).modal('hide');
}

function ShowPoupup(id) {
    $("#" + id).modal('show');
}

function DisplayObject(objInput) {
    $.each(objInput, function (key, value) {
        var ctlKey = "#" + key;
        $(ctlKey).val(value);
    });
}

function ClearForm(formId) {
    var id = "#" + formId + " textarea";
    $(id).val('');
    document.getElementById(formId).reset();
}

function SetCursorToTextEnd(id) {
    var inpId = "#" + id;
    var input = $(inpId);
    var tmp = input.val();
    input.focus().val("").blur().focus().val(tmp);
}


function SetMenuSelected(menu) {
    $(".lmw").removeClass("menu-selected");
    $("#" + menu).addClass("menu-selected");
}

function ValidationHighlight(element, errorClass, validClas) {
    $(element).parents(".form-group").addClass("has-error").removeClass("has-success");
}

function ValidationUnhighlight(element, errorClass, validClas) {
    $(element).parents(".form-group").addClass("has-success").removeClass("has-error");
}


function ShowLoading() {
    $("#dvoverlay").show();
    $("#divload").show();
}

function HideLoading() {
    setTimeout(_hideload, 100);
}

function _hideload() {
    $("#dvoverlay").fadeOut(100);
    $("#divload").hide();
}

function ShowErrorMessage(errid, error) {
    if (IsBlank(errid) == false) {
        var msgid = errid + '_msg';
        $('#' + errid).show();
        $('#' + msgid).html(error);
        ScrollToElement(errid);
    }
}

function IsBlank(value) {
    if (value === undefined || value === null || value === "") {
        return true;
    }
    return false;
}

function IntNull(value) {
    if (value === undefined || value === null || value === "") {
        return null;
    }
    return parseInt(value);
}
function HideError(id) {
    $("#" + id).hide();
    return false;
}

function VoidCallback(data) {

}

function HttpGetCallback(url, showLoading, errorId, callback) {
    try {
        if (showLoading == true) {
            ShowLoading();
        }
        $.ajax({
            type: "GET",
            url: url,
            headers: {
                'spa': 'yes'
            },
            success: function (recData) {
                callback(recData);
                if (showLoading == true) {
                    HideLoading();
                }
            },
            error: function (xhr, textStatus, error) {
                console.info(error);
                HandleHttpError(xhr.status, xhr.responseText, errorId);
            }
        });
    }
    catch (err) {
        HandleError(err.message);
    }
    return false;
}

function HttpPostCallback(actionUrl, jsonData, errorId, callback) {
    try {
        var defaultHeaders = {
            'spa': 'yes'
        };
        var csrfToken = $('input[name="__RequestVerificationToken"]').val();
        if (IsBlank(csrfToken) == false) {
            defaultHeaders['RequestVerificationToken'] = csrfToken;
        }
        HideError(errorId);
        ShowLoading();
        $.ajax({
            type: "POST",
            url: actionUrl,
            Accept: "application/json; charset=utf-8",
            contentType: "application/json; charset=utf-8",
            data: jsonData,
            headers: defaultHeaders,
            success: function (recData) {
                callback(recData);
                HideLoading();
            },
            error: function (xhr, textStatus, error) {
                HandleHttpError(xhr.status, xhr.responseText, errorId);
            }
        });
    }
    catch (err) {
        HandleError(err.message);
    }
}


function HttpSingleFileUploadCallback(actionUrl, file, jsonData, errorId, callback) {
    try {
        var formData = new FormData();
        HideError(errorId);
        var defaultHeaders = {
            'spa': 'yes'
        };
        var csrfToken = $('input[name="__RequestVerificationToken"]').val();
        if (IsBlank(csrfToken) == false) {
            defaultHeaders['RequestVerificationToken'] = csrfToken;
        }
        ShowLoading();
        formData.append("jsonInput", jsonData);
        //formData.append("file", file);
        if (Array.isArray(file)) {
            for (var i = 0; i < file.length; i++) {
                var name = "file" + i;
                formData.append(name, file[i]);
            }
        }
        else {
            formData.append("file", file);
        }
        
        $.ajax({
            type: "POST",
            url: actionUrl,
            cache: false,
            contentType: false,
            data: formData,
            processData: false,
            headers: defaultHeaders,
            success: function (recData) {
                callback(recData);
                HideLoading();
            },
            error: function (xhr, textStatus, error) {
                HandleHttpError(xhr.status, xhr.responseText, errorId);
            }
        });
    }
    catch (err) {
        HandleError(err.message);
    }
}


function IsFoundById(id) {
    var cid = "#" + id;
    if (id.startsWith("#")) {
        cid = id;
    }
    if ($(cid).length) {
        return true;
    }
    return false;
}

function SetDataTable(tableid, divId) {
    var id = '#' + tableid;
    $(id).dataTable({
        "order": [],
        "autoWidth": false,
        "searching": false,
        "lengthChange": false,
        "pageLength": 10,
        "fnInitComplete": function () {
            //after table is intialised do something here
            //console.log(tableid + "data table fnInitComplete");
        },
        "fnDrawCallback": function () {
            $(".no-sort").removeClass("sorting");
            $(".no-sort").removeClass("sorting_asc");
            //console.log(tableid + " data table redrawn");
        },
    });
    $('#' + divId).show();
    $(".no-sort").removeClass("sorting");
    $(".no-sort").removeClass("sorting_asc");
}

function SetDataTableWithoutPagination(tableid, divId) {
    var id = '#' + tableid;
    $(id).dataTable({
        "order": [],
        "autoWidth": false,
        "searching": false,
        "lengthChange": false,
        "paging": false,
        "fnInitComplete": function () {
        },
        "fnDrawCallback": function () {
            $(".no-sort").removeClass("sorting");
            $(".no-sort").removeClass("sorting_asc");
        },
    });
    $('#' + divId).show();
    $(".no-sort").removeClass("sorting");
    $(".no-sort").removeClass("sorting_asc");
}

function GetCheckedItems(clsName) {
    var cars = [];
    var allCheckboxes = $("." + clsName);
    for (var i = 0; i < allCheckboxes.length; i++) {
        if ($(allCheckboxes[i]).prop("checked") === true) {
            cars.push($(allCheckboxes[i]).val());
        }
    }
    return cars;
}
function CheckItems(clsName) {
    //UnCheckItems(clsName);
    //$("." + clsName).attr("checked", "true")
    $("." + clsName).prop('checked', true);
    return false;
}

function UnCheckItems(clsName) {
    //$("." + clsName).removeAttr("checked")
    $("." + clsName).prop('checked', false);
    return false;
}

function HandleHttpError(status, recData, errorId) {
    HideLoading();
    if (status == 422) {
        var obj = JSON.parse(recData);
        ShowErrorMessage(errorId, obj.message);
    }
    else if (status == 403 || status == 401) {
        window.location = "/login";
    }
    else {
        ShowError();
    }
}

function HandleError(error) {
    console.log(error);
    HideLoading();
}

function LoadUrlInTarget(url, destDivId) {
    try {
        ShowLoading();
        $.ajax({
            type: "GET",
            url: url,
            headers: {
                'spa': 'yes'
            },
            success: function (recData) {
                $("#" + destDivId).html(recData);
                HideLoading();
            },
            error: function (xhr, textStatus, error) {
                HandleHttpError(xhr.status, xhr.responseText, "no-err-");
            }
        });
    }
    catch (err) {
        HandleError(err.message);
    }
    return false;
}

function LoadUrl(url, destDivId, errorId) {
    try {
        HideError(errorId);
        ShowLoading();
        $.ajax({
            type: "GET",
            url: url,
            headers: {
                'spa': 'yes'
            },
            success: function (recData) {
                $("#" + destDivId).html(recData);
                HideLoading();
            },
            error: function (xhr, textStatus, error) {
                HandleHttpError(xhr.status, xhr.responseText, errorId);
            }
        });
    }
    catch (err) {
        HandleError(err.message);
    }
    return false;
}


function LoadUrlWithCallback(url, destDivId, errorId, callback) {
    try {
        HideError(errorId);
        ShowLoading();
        $.ajax({
            type: "GET",
            url: url,
            headers: {
                'spa': 'yes'
            },
            success: function (recData) {
                $("#" + destDivId).html(recData);
                HideLoading();
                callback(recData);
            },
            error: function (xhr, textStatus, error) {
                HandleHttpError(xhr.status, xhr.responseText, errorId);
            }
        });
    }
    catch (err) {
        HandleError(err.message);
    }
    return false;
}

function LoadUrlInPopup(url, destDivId, popupBtnId, errorId) {
    try {
        HideError(errorId);
        ShowLoading();
        $.ajax({
            type: "GET",
            url: url,
            headers: {
                'spa': 'yes'
            },
            success: function (recData) {
                $("#" + destDivId).html(recData);
                $("#" + popupBtnId).click();
                HideLoading();
            },
            error: function (xhr, textStatus, error) {
                HandleHttpError(xhr.status, xhr.responseText, errorId);
            }
        });
    }
    catch (err) {
        HandleError(err.message);
    }
    return false;
}

function AddValidation(formid, vrules, vmessages) {
    var fid = "#" + formid;
    $(fid).validate({
        rules: vrules ,
        messages: vmessages,
        errorElement: "em",
        errorPlacement: function (error, element) {
            ValidationErrorPlacement(error, element);
        },
        highlight: function (element, errorClass, validClass) {
            ValidationHighlight(element, errorClass, validClass);
        },
        unhighlight: function (element, errorClass, validClass) {
            ValidationUnhighlight(element, errorClass, validClass);
        }
    });
}

function SetEqualHeight(className) {
    const cards = document.querySelectorAll('.' + className);
    let maxHeight = 0;
    // Reset heights to auto to recalculate
    cards.forEach(card => {
        card.style.height = 'auto';
    });
    // Find the max height
    cards.forEach(card => {
        let cardHeight = card.clientHeight;
        if (cardHeight > maxHeight) {
            maxHeight = cardHeight;
        }
    });
    // Set all cards to the max height
    cards.forEach(card => {
        card.style.height = maxHeight + 'px';
    });
}



function ScrollUntilNotVisible(divId, $container) {
    // Get the element using the provided ID
    const $element = $('#' + divId);

    // Check if the element is within the viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Continuously scroll left and up until the element is not visible
    function scrollLoop() {
        if (isElementInViewport($element[0])) {
            const currentScrollTop = $container.scrollTop();
            const currentScrollLeft = $container.scrollLeft();
            $container.scrollTop(currentScrollTop - 10); // Scroll up
            $container.scrollLeft(currentScrollLeft - 10); // Scroll left
            requestAnimationFrame(scrollLoop); // Keep scrolling until the element is not visible
        }
    }

    scrollLoop(); // Start the scrolling process
}


function AlertIfNotVisibleInScroll(divId) {
    // Get the element using the provided ID
    const $element = $('#' + divId);

    // Check if the element is within the viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // If the element is not visible, trigger an alert
    if (!isElementInViewport($element[0])) {
        alert('The element with ID "' + divId + '" is not visible in the current scroll view.');
    }
}

function ShowError() {
    HideLoading();
    //$("#btn_pop_error_popup").click();
    ShowToastError();
}

function ShowSuccess() {
    $.toast({
        heading: 'Success',
        text: 'Successfully completed.',
        showHideTransition: 'slide',
        icon: 'success',
        position: 'top-right',
        loaderBg: '#00b33c', // Customize the loader background color for success
        hideAfter: 3000, // Automatically hide after 5 seconds,
        width: '350px'
    });
}

function ShowToastError() {
    $.toast({
        heading: 'Error',
        text: 'An unexpected error.',
        showHideTransition: 'fade',
        icon: 'error',
        position: 'top-right',
        loaderBg: '#ff471a', // Customize the loader background color if needed
        hideAfter: 3000, // Automatically hide after 5 seconds
        width: '350px'
    });
}

function ShowToastWarning() {
    $.toast({
        heading: 'Warning',
        text: 'Check message on top.',
        showHideTransition: 'slide',
        icon: 'warning',
        position: 'top-right',
        loaderBg: '#ff9933', // Yellow loader for warning
        hideAfter: 3000, // Hide after 5 seconds
        stack: false,
        width: '350px'
    });
}
function GetLastClassById(id) {
    var element = $('#' + id);
    var classes = element.attr('class');

    if (classes) {
        return classes.trim().split(/\s+/).pop();
    } else {
        return null; // No class or element not found
    }
}

function FindScrollableParent($element) {
    if (!$element || !$element.length) return null;
    var $parent = $element.parent();
    while ($parent && $parent.length) {
        if (!$parent[0] || !$parent[0].ownerDocument) break;
        var overflowY = $parent.css('overflow-y');
        var overflow = $parent.css('overflow');
        if (overflowY === 'auto' || overflowY === 'scroll' || overflow === 'auto' || overflow === 'scroll') {
            return $parent;
        }
        $parent = $parent.parent();
    }
    return $('html, body');
}

function ScrollToElement(elementId) {
    var $element = $('#' + elementId);
    if (!$element.length) {
        console.log('Element not found:', elementId);
        return;
    }
    var $scrollableParent = FindScrollableParent($element);
    if ($scrollableParent && $scrollableParent.length) {
        var parentTop = $scrollableParent.offset() ? $scrollableParent.offset().top : 0;
        var elementTop = $element.offset() ? $element.offset().top : 0;
        var currentScroll = $scrollableParent.scrollTop() || 0;
        var newScrollTop = currentScroll + (elementTop - parentTop);
        $scrollableParent.animate({ scrollTop: newScrollTop }, 500);
    } else {
        $('html,body').animate({ scrollTop: $element.offset().top }, 500);
    }
}