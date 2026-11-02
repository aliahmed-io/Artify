const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const ts = require('typescript');
const plans = [{name:'Pro Package',price:40,credits:120}];
let balance=0;const fulfilled=new Set();
const User={updateOne:async(filter,update)=>{if(fulfilled.has(filter.fulfilledCheckouts.$ne))return {matchedCount:0};fulfilled.add(update.$addToSet.fulfilledCheckouts);balance+=update.$inc.creditBalance;return {matchedCount:1};},exists:async()=>true};
function load(file,imports){const module={exports:{}};vm.runInNewContext(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,{exports:module.exports,module,require:name=>imports[name]||{},console});return module.exports;}
(async()=>{
 const {fulfillCheckout}=load('lib/payments.ts',{'@/lib/database/mongoose':{connectToDatabase:async()=>{}},'@/lib/database/models/user.model':{default:User},'@/constants':{plans}});
 const session={id:'cs_test',payment_status:'paid',metadata:{plan:'Pro Package',buyerId:'123456789012345678901234'},amount_total:4000,currency:'usd'};
 await fulfillCheckout({...session,payment_status:'unpaid'});assert.equal(balance,0);
 await fulfillCheckout(session);await fulfillCheckout(session);assert.equal(balance,120);
 await assert.rejects(()=>fulfillCheckout({...session,id:'bad',amount_total:1}));assert.equal(balance,120);
 const {deepMergeObjects}=load('lib/utils.ts',{'@/constants':{aspectRatioOptions:{}}});
 assert.equal(deepMergeObjects({restore:true},null).restore,true);
 assert.equal(deepMergeObjects({recolor:{to:'red'}},{recolor:{prompt:'shirt'}}).recolor.prompt,'shirt');
 console.log('Passed: unpaid checkout ignored, paid checkout credited once, altered amount rejected, first transformation applied, nested settings preserved.');
})().catch(error=>{console.error(error);process.exitCode=1;});
