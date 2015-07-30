Query(function(){
  // 给 + 按钮绑定事件
  jQuery('#down').click(function(){
    html = 
      "<div class='task'>" +
        "<input type='text' name='textfield' class='task-text'>" +
        "<div class='buttons'>" +
          "<button name='button' class='bt1'>建立</button>" +
          "<button name='button' class='bt2'>取消</button>" +
        "</div>" +
      "</div>";

    jQuery('h1').after(html);
  })

  jQuery(document).on('click', '.task .bt2', function(){
    jQuery(this).closest('.task').remove();
  })

  jQuery(document).on('click', '.task .bt1', function(){
    var url = '/tasks';
    var year  = $('span:eq(0)').text();
    var month = $('span:eq(1)').text();
    var date  = $('span:eq(2)').text();
    var ymd = year+"/"+month+"/"+date;
    var content = jQuery(this).closest('.task').find('input').val();

    var that = this;
    jQuery.ajax({
      url: url,
      type: 'POST',
      data: {
        'task[content]': content,
        'task[date]': ymd
      },

      success: function(res) {
        // console.log(res);
        // 移除表单
        jQuery(that).closest('.task').remove();

        // 添加新行到末尾
        var tr = jQuery("<div>" + res + "</div>").find('table tbody tr').eq(0);
        // console.log(tr);
        jQuery('table tbody').append(tr);
      }

    })
    
  })



jQuery(document).on('click','.delete', function(evt){
  evt.stopPropagation();
  var r = confirm("是否确认删除！")
  if (r == true){
    var task_id=jQuery(this).parent().parent().find('.task_id').text();
    var nod =this;
    jQuery.ajax({
      url: 'tasks/'+task_id,
      type: 'DELETE',
    success: function(res) {
      jQuery(nod).closest('tr').remove();
    }
    });
    // alert("删除成功！");
  } else{
    alert("点错了！");
  };
            
})


  // jQuery(document).on('click','.delete', function(evt){ 
  //   evt.stopPropagation();     
  //   var task_id = jQuery(this).parent().parent().find('.task_id').text();
  //   var nod = this;
  //   jQuery.ajax({
  //     url: 'tasks/'+task_id,
  //     type: 'DELETE',
  //   success: function(res) {
  //     jQuery(nod).closest('tr').remove();
  //   }
  // })       


jQuery(document).on('click', '.tr',function() {
var textarea = "<td>"+
"<input type='text' name='textfield' class='textarea'>"+
"<span class='submit'> 提交 </span>"+
"<span class='cancel'>取消</span>"+
"</td>"
var value = jQuery(this).find('td').eq(1).text();
if (jQuery(this).closest('tbody').find('.textarea').html()!=null)
{alert('先完成修改')}else{
var td1_text = jQuery(this).find('td').eq(1).text();
var data ="<p class ='hidden_data'>"+td1_text+"</p>"
jQuery('h2').after(data)
jQuery(this).find('td').eq(1).after(textarea)
jQuery(this).find('td').eq(1).remove();
}
})


jQuery(document).on('click', '.cancel',function(evt){
  evt.stopPropagation();
  var content="<td>" +jQuery('.hidden_data').text()+"</td>"
  jQuery(this).closest('tr').find('td').eq(0).after(content)
  jQuery(this).closest('td').remove() 
  jQuery('.hidden_data').remove();

});



jQuery(document).on('click', '.submit',function(evt){
  evt.stopPropagation();
  var area_text = jQuery(this).closest('td').find('.textarea').val()
  var task_id =jQuery(this).parent().parent().find('.task_id').text();
  var date = jQuery(this).parent().parent().find('td').eq(2).text();
    jQuery.ajax({
      url: 'tasks/'+task_id,
      type: 'PUT',
      data: {
        'task[content]': area_text,
        'task[date]': date
      },
    success: function(res) {
      jQuery('.textarea').closest('tr').find('td').eq(0).after('<td>'+area_text+'</td>');
      jQuery('.textarea').closest('td').remove();     
    }
    });

  });




jQuery(document).on('click', '.modify',function(evt){
  evt.stopPropagation();
  var area_text = jQuery(this).closest('tr').find('td').eq(1).text();
  var task_id =jQuery(this).parent().parent().find('.task_id').text();
  jQuery(".form_datetime").datetimepicker({
        format: "yyyy/mm/dd",
        autolose: true,
        minView: 2,
        todayBtn: true
    });
  jQuery('.add-on').click()
  var date = document.getElementById("myDatetime").value;
  alert(date)
    jQuery.ajax({
      url: 'tasks/'+task_id,
      type: 'PUT',
      data: {
        'task[content]': area_text,
        'task[date]': date
      },
    success: function(res) {
      jQuery('.textarea').closest('tr').find('td').eq(2).remove();
      jQuery('.textarea').closest('tr').find('td').eq(1).after('<td>'+date+'</td>');    
    }
    });



  });
  





});