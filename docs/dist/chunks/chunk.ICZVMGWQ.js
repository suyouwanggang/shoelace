// src/resources/resource.zh.ts
var resouce = {
  pageBtn: {
    total: (total) => {
      return `\u5171${total}\u6761\u8BB0\u5F55`;
    },
    first: "\u7B2C\u4E00\u9875",
    last: "\u6700\u540E\u4E00\u9875",
    prev: "\u4E0A\u4E00\u9875",
    next: "\u4E0B\u4E00\u9875"
  },
  seachTransfer: "\u8BF7\u8F93\u5165\u641C\u7D22\u5185\u5BB9",
  noData: "\u6CA1\u6709\u4EFB\u4F55\u6570\u636E",
  date: {
    showHeaderStr: function(date, mode) {
      if (mode === "date") {
        return date.getFullYear() + "\u5E74" + String(date.getMonth() + 1).padStart(2, "0") + "\u6708";
      }
      if (mode === "month") {
        return date.getFullYear() + "\u5E74";
      } else {
        const nv = date.getFullYear();
        const n = parseInt(String(nv / 20));
        const year = n * 20;
        return year.toString().padStart(4, "0") + "\u5E74-" + (year + 19).toString().padStart(4, "0") + "\u5E74";
      }
    },
    months: ["\u4E00\u6708", "\u4E8C\u6708", "\u4E09\u6708", "\u56DB\u6708", "\u4E94\u6708", "\u516D\u6708", "\u4E03\u6708", "\u516B\u6708", "\u4E5D\u6708", "\u5341\u6708", "\u5341\u4E00\u6708", "\u5341\u4E8C\u6708"],
    weekDays: ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"]
  }
};
var resource_zh_default = resouce;

export {
  resource_zh_default
};
