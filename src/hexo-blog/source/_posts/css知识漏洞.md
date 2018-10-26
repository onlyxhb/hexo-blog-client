---
title: css知识漏洞
date: 2018-10-10 20:34:21
top: true
img: https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539608804190&di=45e3b69b6d8a9e9aeb1b992c8459ec18&imgtype=0&src=http%3A%2F%2Fwww.epx365.cn%2Fuploads%2Fallimg%2F1805%2F1R1541X4-2.jpg
tags: css
categories: 前端
---


### [线性渐变 linear-gradient](http://www.css88.com/book/css/values/image/linear-gradient.htm)
```css
background: linear-gradient(direction, color-stop1, color-stop2, ...);
```
- **to left**：
设置渐变为从右到左`<=>`270deg
- **to right**：
设置渐变从左到右左`<=>`90deg
- **to top**：
设置渐变从下到上左`<=>`0deg
- **to bottom**(默认值)：
设置渐变从上到下左`<=>`180deg

###  [边框阴影 box-shadow](http://www.runoob.com/cssref/css3-pr-box-shadow.html)
```css
box-shadow: h-shadow v-shadow blur spread color inset;
```
- **h-shadow**	必需的。水平阴影的位置。允许负值
- **v-shadow**	必需的。垂直阴影的位置。允许负值
- **blur**	可选。模糊距离
- **spread**	可选。阴影的大小
- **color**	可选。阴影的颜色。在CSS颜色值寻找颜色值的完整列表
- **inset**	可选。从外层的阴影（开始时）改变阴影内侧阴影

### [字符间距 letter-spacing](http://www.w3school.com.cn/cssref/pr_text_letter-spacing.asp)
```
letter-spacing: normal | <length> | <percentage>
```
- **normal**：
默认间隔
- **length**：
用长度值指定间隔。可以为负值
- **percentage**：
用百分比指定间隔。可以为负值

### [换行 white-space](http://www.w3school.com.cn/cssref/pr_text_white-space.asp)
```
white-space：normal | pre | nowrap | pre-wrap | pre-line
```
- **normal**	默认。空白会被浏览器忽略。
- **pre**	空白会被浏览器保留。其行为方式类似 HTML 中的 pre标签。
- **nowrap**	文本不会换行，文本会在在同一行上继续，直到遇到 br 标签为止。
- **pre-wrap**	保留空白符序列，但是正常地进行换行。
- **pre-line**	合并空白符序列，但是保留换行符