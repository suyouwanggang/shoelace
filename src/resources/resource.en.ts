const resouce = {
  pageBtn: {
    total: (total: number) => {
      return `共${total}条记录`;
    },
    first: 'First',
    last: 'Last',
    prev: 'Prev',
    next: 'Next'
  },
  noData: 'No Data!',
  date:{
    showHeaderStr:function(date:Date,mode:'year'|'month'|'date' ){
      if (mode=== 'date') {
          return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '';
      } if (mode=== 'month') {
          return date.getFullYear() + '';
      } else {
          const nv = date.getFullYear();
          const n = parseInt(String(nv / 20));
          const year = n * 20;
          return year.toString().padStart(4, '0') + ' - ' + (year + 20).toString().padStart(4, '0') + '';
      }
    },
    months:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October ', 'November', 'December'],
    weekDays:['Sun', 'Mon','Tue', 'Wed', 'Thu', 'Fri', 'Sta'],
}
};
export default resouce;
