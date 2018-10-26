---
title: 使用jsencrypt实现密码的前端加密
date: 2018-10-15 18:01:51
categories: 前端
tags:
- js
img: https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539609460140&di=0830644428241860c30765f0107d6c55&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20160910%2F921447d4255b42f28d004229890cc1fc_th.jpg
---
>[jsencrypt](http://travistidwell.com/jsencrypt/demo/index.html)是js的一个使用OpenSSL加密，解密，秘钥生成类库

安装
```js
npm install --save jsencrypt
```
使用
```js
import { JSEncrypt } from 'jsencrypt'
// 加密方法
function RSAencrypt (pas) {
  // 实例化jsEncrypt对象
  let jse = new JSEncrypt()
  // 设置公钥
  jse.setPublicKey(`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCDtWqpTldtYUR8cq8o12kPrOJL
ZfI1fOwZiiHM8dhkOkewujSPo/fkBA10opbzBoD0ov5Uz4d8OLNPopJQlCBN7hJK
QwNrFhHG4sBhv9g95wn7wU/l6WFm67wmp2TJl1Vid/Mz5fdBcZqbR0o/BuLPQfEc
ZHDlxVULpNseEHsKzwIDAQAB
-----END PUBLIC KEY-----`)
  // 加密
  return jse.encrypt(pas)
}
// 解密方法
function RSAdecrypt (pas) {
  let jse = new JSEncrypt()
  jse.setPrivateKey(`-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQCDtWqpTldtYUR8cq8o12kPrOJLZfI1fOwZiiHM8dhkOkewujSP
o/fkBA10opbzBoD0ov5Uz4d8OLNPopJQlCBN7hJKQwNrFhHG4sBhv9g95wn7wU/l
6WFm67wmp2TJl1Vid/Mz5fdBcZqbR0o/BuLPQfEcZHDlxVULpNseEHsKzwIDAQAB
AoGARqDaecAREg6+8x1s4LHjHQzQrS4WHKjI00lHpudp6xV1rEeuN/jtzdB+hrVJ
zTkHnihpyoEfXnXpciLz41ILn+81MsSOtd3zRzYmhfWpuW+Qe8tfKA/foBwhRq2A
TOg8c1SSx1IIH6xWl8VBLhcNcZ3uJe/vLlZbRZbqwuxbaMECQQD+YDt431luGmbn
6+1F1XGil2cN+kMYU2iQz6ImOVJZfaMQD7GOldS7owx55kq+7fAqJcaF+ufLY7q3
wVbo25ddAkEAhIywfRdY8z+n8D2NYzpXEWKW1B8f0pJzomqpV81kpelDKDVbQynR
fkTqnWxwHN2sXpl7hz6zwKWlpDJbPJ0kGwJBAO58RGW/aLXcVOxM+ehGA8K/FaQ6
JJty348cy1Xw2e8C5lURkZMvkAHXDMRgj2VP6KFrRyOnp5e9SXor7pJkBhUCQB3N
xKFb7pRDa++I55G4PHucP23S0cT3SSjr8sfbVxY3LPKNjMe9T22k8VwUVeEntupO
eIgggSqAFI6nA/zNGKECQDuqfE15G78qP9dYKHW/T7jEIxQ8H6TjvQaXfjxdHXUY
E5SR9R9p6oT9Nopf8MQN4zhALmGMQ1m+Opvj5eiDdpc=
-----END RSA PRIVATE KEY-----`)
  return jse.decrypt(pas)
}
```