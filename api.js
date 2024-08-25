// const express = require('express');
// const app = express();
// const uuidAPIKey = require('uuid-apikey');

// const sever = app.listen(3001, () =>{
//     console.log('Start Server : localhost:3001');
// });

// const key = {
//     apiKey: 'JQDSVM9-3EFMWTS-GR6B4D6-HFMXE10',
//     uuid: '95db9dd1-1b9f-4e6b-860c-b2348be9d704'
// };

// //:type -> 어떤 값이든 들어 올 수 있다는 뜻
// app.get('/api/users/:apikey/:type', async (req, res) => {
//     let {apikey, type} = req.params;

//     if(!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
//         res.send('apikey is not valid.');
//     }else {
//         if(type == 'seoul') {
//             let data = [
//                 {name:"홍길동", city:"seoul"},
//                 {name:"김철수", city:"seoul"}
//             ];
//             res.send(data);
//         }else if(type == 'jeju') {
//             let data = [
//                 {name:"박지성", city:"jeju"},
//                 {name:"손흥민", city:"jeju"}
//             ];
//             res.send(data);
//         }else {
//             res.send('Type is not correct.');
//         }
//     }

// });

// app.get('/api/sales/:apikey/:year', async (req, res) => {
//     let {apikey, year} = req.params;

//     if(year == '2019') {
//         let data = [
//             {product:"반도체", amount:"543290000"},
//             {product:"냉장고", amount:"546290000"}
//         ];
//         res.send(data);
//     }else if(year == '2020') {
//         let data = [
//             {product:"반도체", amount:"6290000"},,
//             {product:"냉장고", amount:"540000"}
//         ];
//         res.send(data);
//     }else {
//         res.send('Type is not correct.');
//     }
// });

// app.get('/api/users/:team', async (req, res) => {
//     let {team} = req.params;

//     if(team == 'samsung') {
//         let data = [
//             {name:"구자욱", number:"5"},
//             {name:"원태인", number:"18"}
//         ];
//         res.send(data);
//     }else if(team == 'lg') {
//         let data = [
//             {name:"홍창기", number:"51"},,
//             {name:"안효주", number:"0"}
//         ];
//         res.send(data);
//     }else {
//         res.send('Type is not correct.');
//     }
// });

// app.get('/api/users/:apikey/:type', async (req, res) => {
//     let {apikey, type} = req.params;

//     if(!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
//         res.send('apikey is not valid.');
//     }else {
//         if(type == 'seoul') {
//             let data = [
//                 {name:"홍길동", city:"seoul"},
//                 {name:"김철수", city:"seoul"}
//             ];
//             res.send(data);
//         }else if(type == 'jeju') {
//             let data = [
//                 {name:"박지성", city:"jeju"},
//                 {name:"손흥민", city:"jeju"}
//             ];
//             res.send(data);
//         }else {
//             res.send('Type is not correct.');
//         }
//     }

// });