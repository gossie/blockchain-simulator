(this.webpackJsonpblockchain=this.webpackJsonpblockchain||[]).push([[0],{106:function(t,e,n){t.exports=n(197)},111:function(t,e,n){},112:function(t,e,n){},113:function(t,e,n){},114:function(t,e,n){},118:function(t,e){},120:function(t,e){},154:function(t,e){},155:function(t,e){},197:function(t,e,n){"use strict";n.r(e);var a=n(0),c=n.n(a),o=n(99),r=n.n(o),i=(n(111),n(8)),s=(n(112),function(t){var e=Object(a.useState)("I am waiting!"),n=Object(i.a)(e,2),o=n[0],r=n[1],s=Object(a.useState)(""),u=Object(i.a)(s,2),l=u[0],b=u[1];Object(a.useEffect)((function(){var e=t.miner.observeProofOfWorkSearch().subscribe((function(t){return b(t)}));return function(){return e.unsubscribe()}}));return c.a.createElement("div",null,c.a.createElement("div",null,o," ",l),c.a.createElement("div",null,c.a.createElement("button",{className:"button is-link",onClick:function(){r("I am mining!"),t.miner.startMining()}},"Start"),c.a.createElement("button",{className:"button is-link",onClick:function(){r("I am waiting!"),t.miner.pauseMining()}},"Pause")))}),u=n(44),l=function(t){return c.a.createElement("div",null,"Transfer ",t.transaction.amount," from ",t.transaction.from," to ",t.transaction.to,".")},b=n(15),h=n(16),f=function(){function t(e,n,a){Object(b.a)(this,t),this._from=e,this._to=n,this._amount=a}return Object(h.a)(t,[{key:"from",get:function(){return this._from}},{key:"to",get:function(){return this._to}},{key:"amount",get:function(){return this._amount}}]),t}(),k=function(t){var e=Object(a.useState)(""),n=Object(i.a)(e,2),o=n[0],r=n[1],s=Object(a.useState)(""),b=Object(i.a)(s,2),h=b[0],k=b[1],m=Object(a.useState)(1),p=Object(i.a)(m,2),O=p[0],v=p[1],_=Object(a.useState)(Object(u.a)(t.blockchain.openTransactions)),d=Object(i.a)(_,2),j=d[0],g=d[1];Object(a.useEffect)((function(){var e=t.blockchain.observeNewBlock().subscribe((function(){return g(Object(u.a)(t.blockchain.openTransactions))}));return function(){return e.unsubscribe()}}),[t.blockchain]);var E=j.map((function(t,e){return c.a.createElement(l,{key:e,transaction:t})}));return c.a.createElement("div",null,c.a.createElement("div",null,c.a.createElement("h2",{className:"title"},"Transactions"),"Transfer ",c.a.createElement("input",{"data-testid":"amount",className:"input",type:"text",value:O,onChange:function(t){var e=parseInt(t.target.value);v(e||1)}}),"from ",c.a.createElement("input",{"data-testid":"from",className:"input",type:"text",value:o,onChange:function(t){return r(t.target.value)}}),"to ",c.a.createElement("input",{"data-testid":"to",className:"input",type:"text",value:h,onChange:function(t){return k(t.target.value)}}),c.a.createElement("button",{"data-testid":"add",className:"button is-link",onClick:function(){var e=new f(o,h,O);t.blockchain.addOpenTransaction(e),g((function(t){return[].concat(Object(u.a)(t),[e])}))}},"Add")),c.a.createElement("div",null,"Currently there are ",E.length," open transactions."),c.a.createElement("div",null,E))},m=(n(113),function(t){var e=t.block.transactions.map((function(t){return"Transfered ".concat(t.amount," from ").concat(t.from," to ").concat(t.to)})).join(", ");return c.a.createElement("div",{className:"block box"},c.a.createElement("b",null,"Transactions:")," ",e,c.a.createElement("br",null),c.a.createElement("b",null,"Previous hash:")," ",t.block.previousHash,c.a.createElement("br",null),c.a.createElement("b",null,"Hash:")," ",t.block.hash,c.a.createElement("br",null),c.a.createElement("b",null,"Proof of work:")," ",t.block.proofOfWork)}),p=(n(114),function(t){var e=function(t){return t.map((function(t,e){return c.a.createElement(m,{key:e,block:t})})).reverse()},n=Object(a.useState)(e(t.blockchain.blocks)),o=Object(i.a)(n,2),r=o[0],s=o[1];return Object(a.useEffect)((function(){var n=t.blockchain.observeNewBlock().subscribe((function(){return s(e(t.blockchain.blocks))}));return function(){return n.unsubscribe()}}),[t.blockchain]),c.a.createElement("div",{className:"blockchain"},r)}),O=n(102),v=n(100),_=n(103),d=n(199),j=(n(115),n(25)),g=function(){function t(e,n,a){Object(b.a)(this,t),this._transactions=e,this._previousHash=n,this._proofOfWork=a,this._hash=void 0;var c=e.map((function(t){return"".concat(t.from).concat(t.to).concat(t.amount)})).join();this._hash=Object(j.createHash)("sha256").update(c).update("".concat(n)).update("".concat(a)).digest("hex")}return Object(h.a)(t,[{key:"transactions",get:function(){return this._transactions}},{key:"previousHash",get:function(){return this._previousHash}},{key:"hash",get:function(){return this._hash}},{key:"proofOfWork",get:function(){return this._proofOfWork}}]),t}(),E=n(101),S=function(){function t(){Object(b.a)(this,t),this._blockSubject=void 0,this._blocks=[],this._openTransactions=[];var e=new g([],"",123);this._blocks.push(e),this._blockSubject=new d.a(e)}return Object(h.a)(t,[{key:"observeNewBlock",value:function(){return this._blockSubject.asObservable()}},{key:"addOpenTransaction",value:function(t){this._openTransactions.push(t)}},{key:"addBlock",value:function(e){var n=this;console.debug("blockchain received a new proof of work",e);var a=new g(this._openTransactions.splice(0,t.MAX_BLOCK_SIZE),this.top.hash,e);console.debug("blockchain created a new block",a),this._blocks.push(a);var c=this._blocks.pipe(new w((function(t,e){return n.checkBlocks(t,e)})));console.debug("blockchain was checked for consistency",c),c?(console.debug("blockchain propagates block"),this._blockSubject.next(a)):(console.debug("blockchain removes block"),this._blocks.pop())}},{key:"checkBlocks",value:function(e,n){return Object(j.createHash)("sha256").update("".concat(e.proofOfWork).concat(n.proofOfWork).concat(e.hash)).digest("hex").startsWith(t.PROOF_OF_WORK_CONSTRAINT)}},{key:"top",get:function(){return this._blocks[this._blocks.length-1]}},{key:"blocks",get:function(){return this._blocks}},{key:"openTransactions",get:function(){return this._openTransactions}}]),t}();S.PROOF_OF_WORK_CONSTRAINT="00",S.MAX_BLOCK_SIZE=5;var w=function(t){function e(t){var n;return Object(b.a)(this,e),(n=Object(O.a)(this,Object(v.a)(e).call(this))).reducer=t,n._lastBlock=void 0,n}return Object(_.a)(e,t),Object(h.a)(e,[{key:"getFallbackValue",value:function(){return!0}},{key:"perform",value:function(t){if(this._lastBlock){var e=this.reducer(this._lastBlock,t),n={value:e,done:!e};return this._lastBlock=t,n}return this._lastBlock=t,{value:!1,done:!1}}}]),e}(E.TerminalOperator);var y=n(104),N=n(200),W=n(202),T=n(201),B=function(){function t(e){var n=this;Object(b.a)(this,t),this._blockchain=e,this._proofOfWorkSubject=new y.a,this._miningSubscription=void 0,this._blockSubscription=void 0,this._top=void 0,this._proofOfWork=0,this._top=e.top,this._blockSubscription=e.observeNewBlock().subscribe((function(t){n._top=t,n._proofOfWork=0}))}return Object(h.a)(t,[{key:"observeProofOfWorkSearch",value:function(){return this._proofOfWorkSubject.asObservable()}},{key:"startMining",value:function(){var e=this;this._miningSubscription=Object(N.a)(t.MINING_TIMEOUT).pipe(Object(T.a)((function(){return 0===e._proofOfWork?Object(W.a)(3e3):Object(W.a)(0)}))).subscribe((function(){return e.mine()}))}},{key:"pauseMining",value:function(){var t;null===(t=this._miningSubscription)||void 0===t||t.unsubscribe()}},{key:"tearDown",value:function(){this._miningSubscription&&this._miningSubscription.unsubscribe(),this._blockSubscription.unsubscribe()}},{key:"mine",value:function(){this._proofOfWorkSubject.next("Currently checking ".concat(this._proofOfWork)),Object(j.createHash)("sha256").update("".concat(this._top.proofOfWork).concat(this._proofOfWork).concat(this._top.hash)).digest("hex").startsWith(S.PROOF_OF_WORK_CONSTRAINT)?(this._proofOfWorkSubject.next("Wohoo! ".concat(this._proofOfWork," worked. I am creating a new block.")),this._blockchain.addBlock(this._proofOfWork)):++this._proofOfWork}}]),t}();B.MINING_TIMEOUT=50;var I=function(){var t=Object(a.useState)(new S),e=Object(i.a)(t,2),n=e[0],o=(e[1],Object(a.useState)(new B(n))),r=Object(i.a)(o,2),u=r[0];r[1];return Object(a.useEffect)((function(){return function(){return u.tearDown()}})),c.a.createElement("div",{className:"tile is-ancestor"},c.a.createElement("div",{className:"tile"},c.a.createElement("div",{className:"tile is-parent"},c.a.createElement("div",{className:"tile is-child box"},c.a.createElement(k,{blockchain:n}))),c.a.createElement("div",{className:"tile is-parent is-vertical"},c.a.createElement("div",{className:"tile is-child box"},c.a.createElement(s,{miner:u})),c.a.createElement("div",{className:"tile is-child box"},c.a.createElement(p,{blockchain:n})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(I,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}},[[106,1,2]]]);
//# sourceMappingURL=main.809f2617.chunk.js.map