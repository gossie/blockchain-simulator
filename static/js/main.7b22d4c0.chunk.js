(this.webpackJsonpblockchain=this.webpackJsonpblockchain||[]).push([[0],{102:function(t,e,n){t.exports=n(192)},107:function(t,e,n){},108:function(t,e,n){},109:function(t,e,n){},110:function(t,e,n){},113:function(t,e){},115:function(t,e){},149:function(t,e){},150:function(t,e){},192:function(t,e,n){"use strict";n.r(e);var a=n(0),o=n.n(a),c=n(98),r=n.n(c),i=(n(107),n(108),n(15)),s=function(t){var e=Object(a.useState)(""),n=Object(i.a)(e,2),c=n[0],r=n[1];return Object(a.useEffect)((function(){var e=t.miner.observeProofOfWorkSearch().subscribe((function(t){return r(t)}));return function(){return e.unsubscribe()}})),o.a.createElement("span",null,"I am mining! ",c)},u=n(99),l=function(t){return o.a.createElement("div",null,"Transfer ",t.transaction.amount," from ",t.transaction.from," to ",t.transaction.to,".")},h=n(18),f=n(19),b=function(){function t(e,n,a){Object(h.a)(this,t),this._from=e,this._to=n,this._amount=a}return Object(f.a)(t,[{key:"from",get:function(){return this._from}},{key:"to",get:function(){return this._to}},{key:"amount",get:function(){return this._amount}}]),t}(),k=function(t){var e=Object(a.useState)(""),n=Object(i.a)(e,2),c=n[0],r=n[1],s=Object(a.useState)(""),h=Object(i.a)(s,2),f=h[0],k=h[1],m=Object(a.useState)(1),p=Object(i.a)(m,2),v=p[0],O=p[1],d=Object(a.useState)([]),_=Object(i.a)(d,2),j=_[0],E=_[1];Object(a.useEffect)((function(){var e=t.blockchain.observeNewBlock().subscribe((function(){return E([])}));return function(){return e.unsubscribe()}}),[t.blockchain]);var g=j.map((function(t,e){return o.a.createElement(l,{key:e,transaction:t})}));return o.a.createElement("div",null,o.a.createElement("div",null,o.a.createElement("h2",null,"New transaction"),"Transfer ",o.a.createElement("input",{"data-testid":"amount",className:"input",type:"text",value:v,onChange:function(t){var e=parseInt(t.target.value);O(e||1)}}),"from ",o.a.createElement("input",{"data-testid":"from",className:"input",type:"text",value:c,onChange:function(t){return r(t.target.value)}}),"to ",o.a.createElement("input",{"data-testid":"to",className:"input",type:"text",value:f,onChange:function(t){return k(t.target.value)}}),o.a.createElement("button",{"data-testid":"add",className:"button is-link",onClick:function(){var e=new b(c,f,v);t.blockchain.addOpenTransaction(e),E((function(t){return[].concat(Object(u.a)(t),[e])}))}},"Add")),g)},m=(n(109),function(t){var e=t.block.transactions.map((function(t){return"".concat(t.amount," from ").concat(t.from," to ").concat(t.to)})).join(", ");return o.a.createElement("div",{className:"block box"},"Transactions: ",e,o.a.createElement("br",null),"Previous hash: ",t.block.previousHash,o.a.createElement("br",null),"Hash: ",t.block.hash,o.a.createElement("br",null),"Proof of work: ",t.block.proofOfWork)}),p=(n(110),function(t){var e=Object(a.useState)(t.blockchain.blocks.map((function(t,e){return o.a.createElement(m,{key:e,block:t})})).reverse()),n=Object(i.a)(e,2),c=n[0],r=n[1];return Object(a.useEffect)((function(){var e=t.blockchain.observeNewBlock().subscribe((function(){r(t.blockchain.blocks.map((function(t,e){return o.a.createElement(m,{key:e,block:t})})).reverse())}));return function(){return e.unsubscribe()}}),[t.blockchain]),o.a.createElement("div",{className:"blockchain"},c)}),v=n(194),O=n(41),d=function(){function t(e,n,a){Object(h.a)(this,t),this._transactions=e,this._previousHash=n,this._proofOfWork=a,this._hash=void 0;var o=e.map((function(t){return"".concat(t.from).concat(t.to).concat(t.amount)})).join();this._hash=Object(O.createHash)("sha256").update(o).update("".concat(n)).update("".concat(a)).digest("hex")}return Object(f.a)(t,[{key:"transactions",get:function(){return this._transactions}},{key:"previousHash",get:function(){return this._previousHash}},{key:"hash",get:function(){return this._hash}},{key:"proofOfWork",get:function(){return this._proofOfWork}}]),t}(),_=function(){function t(){Object(h.a)(this,t),this._blockSubject=void 0,this._blocks=[],this._openTransactions=[];var e=new d([],"",123);this._blocks.push(e),this._blockSubject=new v.a(e)}return Object(f.a)(t,[{key:"observeNewBlock",value:function(){return this._blockSubject.asObservable()}},{key:"addOpenTransaction",value:function(t){this._openTransactions.push(t)}},{key:"addBlock",value:function(t){var e=new d(this._openTransactions,this.top.hash,t);this._blocks.push(e),this._openTransactions=[],this._blockSubject.next(e)}},{key:"top",get:function(){return this._blocks[this._blocks.length-1]}},{key:"blocks",get:function(){return this._blocks}},{key:"openTransactions",get:function(){return this._openTransactions}}]),t}(),j=n(100),E=n(195),g=n(197),y=n(196),w=function(){function t(e){var n=this;Object(h.a)(this,t),this._blockchain=e,this._proofOfWorkSubject=new j.a,this._subscriptions=[],this._top=void 0,this._proofOfWork=0,this._subscriptions.push(e.observeNewBlock().subscribe((function(t){n._top=t,n._proofOfWork=0}))),this._subscriptions.push(Object(E.a)(t.MINING_TIMEOUT).pipe(Object(y.a)((function(){return 0===n._proofOfWork?Object(g.a)(3e3):Object(g.a)(0)}))).subscribe((function(){return n.mine()})))}return Object(f.a)(t,[{key:"observeProofOfWorkSearch",value:function(){return this._proofOfWorkSubject.asObservable()}},{key:"mine",value:function(){this._proofOfWorkSubject.next("Currently checking ".concat(this._proofOfWork)),Object(O.createHash)("sha256").update("".concat(this._top.proofOfWork).concat(this._proofOfWork).concat(this._top.hash)).digest("hex").startsWith("00")?(this._proofOfWorkSubject.next("Wohoo! ".concat(this._proofOfWork," worked. I am creating a new block.")),this._blockchain.addBlock(this._proofOfWork)):++this._proofOfWork}}]),t}();w.MINING_TIMEOUT=50;var N=function(){var t=new _,e=new w(t);return o.a.createElement("div",{className:"tile is-ancestor"},o.a.createElement("div",{className:"tile is-vertical"},o.a.createElement("div",{className:"tile is-parent"},o.a.createElement("div",{className:"tile is-child box"},o.a.createElement(k,{blockchain:t})),o.a.createElement("div",{className:"tile is-child box"},o.a.createElement(s,{miner:e}))),o.a.createElement("div",{className:"tile is-parent"},o.a.createElement("div",{className:"tile is-child box"},"Participants"),o.a.createElement("div",{className:"tile is-child box"},o.a.createElement(p,{blockchain:t})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}},[[102,1,2]]]);
//# sourceMappingURL=main.7b22d4c0.chunk.js.map