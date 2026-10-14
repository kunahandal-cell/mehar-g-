const SZ={pz:['Small 7"','Medium 10"','Large 13"','XL 17"'],pa:['Medium','Large'],hf:['Half','Full'],bq:['Quarter','Half','Full']};
const P=(a,p,z='pz')=>a.map(n=>[n.toLowerCase().replace(/\W+/g,'').slice(0,14),n,'',p,z]);
const MENU=[
{id:'deals',t:'Deals',i:[
['d1','Deal 1','5 Grill Burger + 1.5L drink',[1600]],
['d2','Deal 2','1 Small Pizza + 10 Peri Peri Wings + 1L drink',[1050]],
['d3','Deal 3','2 Small Pizza (Tikka + Fajita) + 1L drink',[1050]],
['d4','Deal 4','1 Small Pizza + 10 Peri Peri Wings + 10 Nuggets + 1L drink',[1530]],
['d5','Deal 5','2 Medium Pizza (Tikka + Fajita) + 1.5L drink',[1800]],
['d6','Deal 6','1 Small + 1 Medium Pizza (Tikka + Fajita) + 10 Peri Peri Wings + 1.5L drink',[1900]],
['d7','Deal 7','1 Large Pizza (Tikka + Fajita) + 1 Large Creamy Pasta + 1.5L drink',[1850]],
['d8','Deal 8','2 Large Pizza (Tikka + Fajita) + 1.5L drink',[2450]],
['d9','Deal 9','XL Family Pizza 17" (Tikka + Fajita) + 1.5L drink',[1750]],
['d10','Deal 10','3 Small Pizza (Tikka + Fajita + Supreme) + 1.5L drink',[1500]]]},
{id:'reg',t:'Regular Pizza',i:P(['Chicken Tikka','Chicken Fajita','Chicken Supreme','Cheese Lover','Chicken Achari','Hot & Spicy','Vegy Lover'],[480,850,1200,1700])},
{id:'spc',t:'Special Pizza',i:P(['Mehar G Special','Behari Kabab','Lazania Pizza','Special Malai Boti','Bar B.Q Pizza'],[550,950,1350,2000])},
{id:'prm',t:'Premium Pizza',i:P(['Crown Crust','Kabab Stuffer','Chicken Cheese Stuffer'],[650,1200,1650,2400])},
{id:'pst',t:'Pasta',i:[['pa1','Creamy Pasta','',[400,550],'pa'],['pa2','Special Pasta','',[400,550],'pa'],['pa3','Spicy Pasta','',[400,550],'pa'],['pa4','Special Alfredo Pasta','',[450,650],'pa']]},
{id:'brg',t:'Burgers',i:[['b1','Grill Burger','',[300]],['b2','Special Grill Burger','',[400]],['b3','Reggy Burger','',[270]],['b4','Chapli Burger','',[270]],['b5','Chapli with Reggy Burger','',[400]]]},
{id:'shw',t:'Shawarma & Paratha',i:[['s1','Grill Shawarma','',[300]],['s2','Kabab Shawarma','',[300]],['s3','Kabab Paratha','',[350]],['s4','Grill Paratha','',[350]]]},
{id:'brs',t:'Broast',i:[['br1','Spicy Injected Broast','1 Leg + 1 Thigh + 1 Bun + Dip Sauce + Fries (Quarter) · 2+2 (Half) · 4+4, 2 Bun, 2 Dip (Full)',[690,1250,2350],'bq']]},
{id:'snk',t:'Fries & Wings',i:[['f1','Simple Fries','',[150,250],'hf'],['f2','Loaded Fries','',[400,550],'hf'],['w1','Hot Wings','10 pieces',[600]],['w2','BBQ Wings','10 pieces',[500]],['w3','Peri Peri Wings','10 pieces',[500]],['w4','Nuggets','10 pieces',[500]],['f3','Pizza Fries','',[650]],['f4','Beef Chapli Lacha Paratha','',[500]]]},
{id:'grl',t:'Rolls & Grill',i:[['g1','Spin Roll','',[650]],['g2','Pizza Sandwich','',[650]],['g3','Special Grill Steak','',[550]],['g4','Special Grill Wrap','',[450]]]},
{id:'ext',t:'Extras',i:[['x1','Extra Topping','Pick your pizza size',[100,150,200,250],'pz'],['x2','Dip Sauce','',[50]]]}];
