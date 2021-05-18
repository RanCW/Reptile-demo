const fs = require('fs')
const glob = require("glob")
const cheerio = require('cheerio')
const path = require('path')
const superagent = require('superagent')
const xlsx = require('node-xlsx');
const allFile = glob.sync('./json/*.json')


function patchFromUrl(url){
  superagent.get('http://news.baidu.com/').end((err, res) => {
  if (err) {
  } else {
    parseDomNode(res.text);
  }
});
}

// 文件读取
function fileRead(filePath){
  fs.readFile(filePath,"utf-8",(err,data)=>{
    if(err){
      console.log(filePath,err);
      return
    }
    const result = JSON.parse(data);
  
  })
}

// 节点获取
function parseDomNode(data) {
  const $ = cheerio.load(data);
  console.log($("#pane-news li strong a").text());
  let test = [{
    name: '我的表格1',
    data: [
        ['name', 'age'],
        ['Tom', 11],
        ['Bob', 13]
    ]
}, {
    name: '我的表格2',
    data: [
        ['animal', 'legs'],
        ['cat', 4],
        ['dog', 4],
        ['duck', 2]
    ]
}]

  writeFile("./result.xlsx",test)
}

// 文件写入
// data——格式，[{name:"sheet name",data:[[表头1，表头2],[value1，value2]]}]
function writeFile(filePath,data) {
  const buffer = xlsx.build(data);
  fs.writeFile(filePath, buffer, err => {
    if (err) {
        throw err;
    }
});
}

patchFromUrl()