import './App.css';
import ReceptInfo from "./bricks/ReceptInfo";
import ReceptList from "./bricks/ReceptList";
import 'bootstrap/dist/css/bootstrap.min.css';

const cookbook = {
  name: "Receptů"
};
const receptList = [
  {
    receptname: "Salát z naklíčené čočky",
    description: "Mrkev, okurku a papriku nakrájejte na malé kostičky a dejte do větší mísy spolu s naklíčenou čočkou. Cibuli nakrájejte najemno a přidejte k zelenině. Přisypte nasekanou petrželku. V misce nebo hrníčku důkladně promíchejte lák z okurek, olivový olej a med. Zálivku nalijte do mísy a důkladně promíchejte. Na závěr dochuťte solí a pepřem.",
    imgUri: "https://zachranjidlo.cz/wp-content/uploads/dsc02309-1-e1652694711486-1024x433-1200x500-c-default.jpg",
    id: "b6c21cf8807dd356"
  },
  {
    receptname: "Ovesné placičky",
    description: "Cibuli oloupejte a nastrouhejte nahrubo. Mrkev důkladně umyjte a nastrouhejte najemno spolu s česnekem. V míse smíchejte vločky, cibuli, mrkev, česnek a koření. Přidejte strouhanku a důkladně promíchejte, ideálně rukou tak, aby vznikla jednotná směs. Pokud je směs příliš suchá, přidejte trošku vody, pokud je příliš mokrá, přidejte trošku strouhanky. Na pánvi rozpalte olej, ze směsi vytvarujte malé placičky a smažte z obou stran dozlatova.",
    imgUri: "https://zachranjidlo.cz/wp-content/uploads/dsc-0516-1-1024x480-1200x500-c-default.jpg",
    id: "854f2f3cb8954916"

  },
  {
    receptname: "Barbecue burger ze zbylého kuřete",
    description: "Rozehřejte troubu na 240 °C. Obrané drůbeží maso natrhejte na vlákna, zamíchejte s barbecue omáčkou a rozprostřete do pekáčku. Dejte do trouby a pečte asi 10 minut. Rozpůlené bulky opečte na rozpálené pánvi na sucho z obou stran. Limetu umyjte, nastrouhejte kůru, šťávu vymačkejte a obojí smíchejte s majonézou. Pomocí škrabky udělejte z mrkve tenké proužky. Přendejte je do misky, přidejte špetku soli a pepře a pár kapek limety a promíchejte. Začněte skládat burger. Obě půlky bulek pomažte limetovou majonézou. Na spodní polovinu bulky navrstvěte natrhaný koriandr, na plátky nasekanou chilli papričku, mrkvové proužky, tenká kolečka šalotky a plátek rajčete. Nakonec přidejte vrstvu zapečeného bbq kuřete a plátek cheddaru. Přiklopte vrchní polovinou bulky a podávejte.",
    imgUri: "https://zachranjidlo.cz/wp-content/uploads/bbq-kure-burger-1024x493-1200x500-c-default.png",
    id: "1ae20af4cfa8efc4"
  },
  {
    receptname: "Chřestová polévka",
    description: "Ve velkém hrnci přiveďte k varu 1000 ml vody. Omytý chřest oloupejte, odlomte dřevnaté konce a dejte je pomalu vařit. Z chřestu odkrojte hlavičky a zbytek chřestu pokrájejte na 1 cm kousky. V hrnci rozehřejte 20 g másla a hlavičky na něm lehce opečte, dejte stranou. Na zbylém másle pomalu restujte nadrobno pokrájenou šalotku a prolisovaný stroužek česneku dosklovata. Přidejte pokrájené stonky chřestu a pomalu restujte dalších 5 minut. Přilijte vývar z chřestu a vařte 15 minut. Vše důkladně promixujte a vraťte do hrnce a vypněte plotýnku. V misce smíchejte žloutky s majonézou a vínem. Směs pomalu vlijte do hrnce s polévkou a za stálého míchání dokud polévka lehce nezhoustne. Lehce polévku přihřejte a dochuťte solí a citronovou šťávou. Polévku ozdobte opečenými hlavičkami chřestu a výhonky hrášku. Servírujte s opečenou bagetou.",
    imgUri: "https://zachranjidlo.cz/wp-content/uploads/chrestpolevka-1024x427-1200x500-c-default.png",
    id: "2dd281dff25fe765"
  },
  {
    receptname: "Drůbeží paštika s vepřovými kousky",
    description: "Játra důkladně očistěte. Odkrojky z vepřového rozmixujte do hladka. Přidejte očištěná játra, koření, víno, bylinky, sůl, pepř, česnek, šalotku, 100 g másla a rozmixujte do hladka. Rozmixovanou směsí naplňte menší zavařovací skleničky nebo hřbet vyložený folií. Vložte do pekáčku, podlijte asi 3 cm vody a dejte péct do trouby na 100 °C asi 50 minut. Mezitím si připravte bylinkové máslo na zalití paštiky. Máslo rozpusťte na mírném ohni a následně rozmixujte s medvědím česnekem (stačí polovina, zbytek použijte na ozdobu). Zkontrolujte paštiku. Správně upečená by měla být pěkně růžová. Pokud je hotová, zalijte ji zeleným máslem a dejte chladit na několik hodin, nejlépe do druhého dne. Podávejte s krajícem rozpečeného chleba a čerstvými listy medvědího česneku.",
    imgUri: "https://zachranjidlo.cz/wp-content/uploads/pastika-1024x493-1200x500-c-default.png",
    id: "a771ee4c1359b270"
  },
  {
    receptname: "Cuketové závitky s chlebovým parmazánem",
    description: "Ztvrdlý chleba nalámejte a nasekejte nožem najemno, podrťte v hmoždíři nebo rozmixujte. Směs vsypte na rozehřátou pánev a přidejte sůl, cukr a ocet. Za stálého míchání pražte 2 minuty. Přilijte olej a směs dále míchejte 3–5 minut, až „parmazán” zezlátne. Poté ho nechte vychladnout. Cukety nakrájejte podélně na tenké plátky (cca 0,5 cm, ne více). Plátky z obou stran lehce posolte a nechte je alespoň 15 minut “vypotit”. Plátky cukety osušte a na rozpálené pánvi s trochou olivového oleje opečte z každé strany dozlatova. Dle chuti můžete přidat čerstvý pepř. Cuketu nechejte zchladnout, každý plátek namažte tenkou vrstvou žervé a posypte chlebovým parmazánem. Na jeden konec plátku dejte pár lístků rukoly, bylinek či jiných natí tak, aby stonky ležely na okraji plátku a lístky na druhé straně trošku vyčnívaly. Srolujte ze strany, kde leží bylinky, do závitku a podávejte jako předkrm nebo jednohubku.",
    imgUri: "https://zachranjidlo.cz/wp-content/uploads/zavitky-1024x493-1200x500-c-default.png",
    id: "508200e97ac04f80"
  },
  {
    receptname: "Focaccia s olejem ze sušených rajčat",
    description: "Ve větší míse smíchejte vodu a droždí a nechejte pár minut stát, aby se droždí aktivovalo. Do mísy postupně přisypávejte mouku a sůl a míchejte, dokud nevznikne hladké těsto. Přikryjte utěrkou a nechejte v teple kynout alespoň 1 hodinu. Vykynuté těsto přendejte na pomoučenou plochu a rozdělte jej na dvě poloviny. Oba bochánky přendejte na plech vyložený pečícím papírem a rozprostřete do silnější placky. Pokapejte olejem, můžete přidat i kousky sušených rajčat, bylinky nebo pár oliv. Olej důkladně rozetřete pomocí rukou a prsty promačkejte, aby v placce vznikly mírné prohlubně. Posypejte hrubou solí a pečte na 250 °C asi 10-12 minut do zlatohněda.",
    imgUri: "https://zachranjidlo.cz/wp-content/uploads/dsc02208-1024x426-1200x500-c-default.jpg",
    id: "2b7dae44b479363a"
  },
  {
    receptname: "Katalánské zeleninové karbanátky se slaninou",
    description: "Brambory oloupejte, nakrájejte na kostky a uvařte v osolené vodě doměkka. Kapustu zbavte vnějších ovadlých listů, vnitřní nasekejte na nudličky. Česnek oloupejte a nakrájejte na tenké plátky. Z uzeniny odkrojte případnou kůži nebo sloupněte slupku a nakrájejte ji na silnější plátky (asi 3–5 mm). Jakmile jsou brambory uvařené, slijte polovinu vody, vsypte k nim kapustu, nechte ji 1 minutu spařit a slijte zbylou vodu. Brambory rozmačkejte šťouchadlem nebo vařečkou a promíchejte s kapustou. Na horké pánvi opečte plátky uzeniny dozlatova z obou stran. Opatrně ji vyjměte, ale vypečený tuk ponechte v pánvi. Ve vypečeném tuku orestujte česnek dozlatova. Přidejte brambory s kapustou a opečte je ze všech stran. Z bramborové směsi můžete tvořit placičky a opékat je dozlatova z obou stran. Podávejte s plátky uzeniny. Místo uzeniny můžete použít zbylé pečené maso, hodí se tučnější části jako bůček, krkovice, ale i řízek. Pokud maso nemá dostatek tuku, opečte ho na 1–2 lžících sádla.",
    imgUri: "https://zachranjidlo.cz/wp-content/uploads/katalanske_karbanatky-1024x427-1200x500-c-default.png",
    id: "f00a783bfd2de513"
  },
  {
    receptname: "Francouzský rajčatový koláč",
    description: "Rajčata nakrájejte na tlustší plátky, posolte z obou stran a nechte alespoň hodinu v pokojové teplotě, aby pustila část šťávy. Koláčovou formu vyložte pečícím papírem nebo vymažte máslem a vysypte moukou. Listové těsto rozválejte, vyložte jím formu a dno propíchejte vidličkou. Na těsto rovnoměrně rozetřete hořčici. Pokud jsou rajčata hodně šťavnatá, nebo jste neměli čas nechat pustit jejich šťávu, posypte hořčici trochou strouhanky. Na dno koláče rozprostřete plátky rajčat, pokapejte olivovým olejem a přidejte trošku soli a čerstvě namletého pepře. Koláč vložte do trouby rozehřáté na 220°C a pečte asi 35 minut, dokud okraje koláče nezezlátnou. Nechejte koláč mírně zchladnout, ozdobte jej lístky bazalky a podávejte ho ještě teplý či za studena.",
    imgUri: "https://zachranjidlo.cz/wp-content/uploads/img_6491-1024x414-1200x500-c-default.jpg",
    id: "62cee1045b85cdda"
  },
  {
    receptname: "Skořicové hranolky z chleba",
    description: "Zbylý chleba nakrájejte na malé hranoly. Smíchejte rozkvedlaná vajíčka s mlékem a solí. Chleba obalte ve vajíčku a nechte ho trochu nasáknout. Na pánvi rozehřejte polovinu másla a postupně chleba ze všech stran dozlatova osmahněte. Ještě teplé hranolky obalte ve skořicovém cukru (cukr krupice smíchaný se skořicí) a naservírujte na talířku nebo v hezkém hrnečku. Skořicové hranolky můžete také ve zjednodušené podobě upéct v troubě. V tom případě přelijte rozpuštěné máslo přes pokrájené hranolky ze staršího chleba a důkladně rukama promíchejte. Zasypte je cukrem se skořicí a opět promíchejte tak, aby se cukr rovnoměrně distribuoval po celém povrchu chleba. Pečte na 180 °C dozlatova, přibližně 5 až 10 minut. Po vytažení z trouby je můžete ještě extra zasypat trochou skořice.",
    imgUri: "https://zachranjidlo.cz/wp-content/uploads/sh7a0274-1-1024x527-1200x500-c-default.jpg",
    id: "e6a2450d6d6cd747"
  }
];

function App() {
  return (
    <div className="App">
      <ReceptInfo cookbook={cookbook} />
      <ReceptList receptList={receptList} />
    </div>
  );
}

export default App;
