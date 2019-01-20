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
    $(".only-numeric").keypress(function(e){
        var keyCode = e.which;
        console.log(keyCode);
        /*
        8 - (backspace)
        32 - (space)
        48-57 - (0-9)Numbers
        */
        if ( (keyCode != 8 || keyCode ==32 ) && (keyCode < 48 || keyCode > 57)) { 
          return false;
        }
      });
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