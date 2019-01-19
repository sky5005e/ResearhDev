var ajaxReqCount = 0;
// Call the dataTables jQuery plugin
$(document).ready(function () {
    //$('.data-table-main').DataTable();
    // $('.datepicker').datetimepicker({
    //     format: 'DD/MM/YYYY',
    //     ignoreReadonly: false
    //   });


    // $('#example_a').DataTable({
    //   'paging'      : true,
    //   'lengthChange': true,
    //   'searching'   : true,
    //   'ordering'    : true,
    //   'info'        : true,
    //   'autoWidth'   : true
    // });
    // $('input[type=submit]').click(function () {
    //     if($(".val-error:visible").length > 0)
    //     {
    //        // console.log('please fill all the required fields');
    //     }
    //     // $('html,body').animate({
    //     //     scrollTop: $("div.val-error").offset()
    //     // }, 'slow');
    // }

    //)
});


var SkyExt = (function () {

    return {
        ShowLoader: function () {
            //console.log("count", ajaxReqCount);
            ajaxReqCount = ajaxReqCount + 1;
            $("#preloader").show();
        },
        HideLoader: function () {
            //console.log("count hide", ajaxReqCount);
            ajaxReqCount = ajaxReqCount - 1;
            if (ajaxReqCount <= 0)
                $("#preloader").hide();
            else
                $("#preloader").show();
        }
    }

})(SkyExt || {})