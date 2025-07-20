// === START PART 1 ===
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('piphagorForm');
  const birthdateInput = document.getElementById('birthdate');
  const nameInput = document.getElementById('yourName');
  const inputYearInput = document.getElementById('inputYear');

  // установить текущий год по умолчанию
  inputYearInput.value = getCurrentYear();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    calculateMatrix();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      calculateMatrix();
    }
  });

  function getCurrentYear() {
    return new Date().getFullYear().toString();
  }

  // ================== ФУНКЦИИ ==================
  function technicalLayout(formattedDate) {
    const cleanedDate = formattedDate.replace(/\./g, '').replace(/0/g, '');
    const nums = cleanedDate.split('').map(Number);
    const b1 = nums.reduce((a, b) => a + b, 0).toString();
    const b2 = (b1[1] === '0') ? b1[0] : b1.split('').reduce((a, b) => a + parseInt(b), 0).toString();
    const body = b1 + b2;
    const s1 = Math.abs(parseInt(b1) - nums[0] * 2).toString();
    const s2 = (s1.length === 1) ? '0' + s1 : s1.split('').reduce((a, b) => a + parseInt(b), 0).toString();
    const soul = s1 + s2;
    return { cleanedDate, body, soul };
  }

  function calculateTablePiphagor(totalNumbers) {
    const { cleanedDate, body, soul } = totalNumbers;
    const total = cleanedDate + body + soul;
    const result = {};
    for (let i = 1; i <= 9; i++) {
      const strI = i.toString();
      const count = total.split('').filter(ch => ch === strI).length;
      result[strI] = count > 0 ? strI.repeat(count) : '';
    }
    return result;
  }

  function calculateTablePiphagorWithName(totalNumbers, countName) {
    const { cleanedDate, body, soul } = totalNumbers;
    const total = cleanedDate + body + soul + countName;
    const result = {};
    for (let i = 1; i <= 9; i++) {
      const strI = i.toString();
      const count = total.split('').filter(ch => ch === strI).length;
      result[strI] = count > 0 ? strI.repeat(count) : '';
    }
    return result;
  }

  function numberDestiny(formattedDate) {
    const clean = formattedDate.replace(/\./g, '').replace(/0/g, '');
    const num = clean.split('').reduce((sum, d) => sum + parseInt(d), 0);
    const result = num < 10 ? num : ((num - 1) % 9) + 1;
    return result.toString();
  }

  const lifeCodeDict = {
    '1': 'Любознательные, хотят всё знать, человек жаждущий знания',
    '2': 'Энергичность',
    '3': 'Талант',
    '4': 'Расчёт, терпение, дипломатичность',
    '5': 'Сердечность доброта',
    '6': 'Трудолюбие',
    '7': 'Счастье, харизма',
    '8': 'Удача, везение, баловень судьбы',
    '9': 'Аналитические способности, очень тяжело удивить этого человека чем-либо',
    '22': 'Коммуникабельный человек',
    '99': 'Мудрец'
  };

  function getLifeCodeValue(lifeCode) {
    if (lifeCodeDict[lifeCode.slice(0, 2)]) return lifeCodeDict[lifeCode.slice(0, 2)];
    if (lifeCodeDict[lifeCode[0]]) return lifeCodeDict[lifeCode[0]];
    return null;
  }

  function calculateLifeCode(formattedDate) {
    const [day, month, year] = formattedDate.split('.').map(Number);
    let result = String(day * month * year);
    return result.length < 6 ? result.padEnd(6, '0') : result;
  }

  function calculateLuckie(destiny) {
    const dict = {
      '1': '1-10-19-28',
      '2': '2-11-20-29',
      '3': '3-12-21-30',
      '4': '4-13-22-31',
      '5': '5-14-23-30',
      '6': '6-15-24-30',
      '7': '7-14-21-28',
      '8': '8-16-24',
      '9': '9-18-27'
    };
    return dict[destiny];
  }

  function calculateReincarnation(listTable) {
    return listTable.filter(x => x !== '-').join('').length;
  }

  // === END PART 1 ===
  // === START PART 2 ===

  function calculationTemperament(dictTable) {
    return (dictTable['3']?.length || 0) +
      (dictTable['5']?.length || 0) +
      (dictTable['7']?.length || 0);
  }

  function calculationRealization(dictTable) {
    return (dictTable['1']?.length || 0) +
      (dictTable['4']?.length || 0) +
      (dictTable['7']?.length || 0);
  }

  function calculationHelpingFamily(dictTable) {
    return (dictTable['2']?.length || 0) +
      (dictTable['5']?.length || 0) +
      (dictTable['8']?.length || 0);
  }

  function calculationHabits(dictTable) {
    return (dictTable['3']?.length || 0) +
      (dictTable['6']?.length || 0) +
      (dictTable['9']?.length || 0);
  }

  function calculationSpirituality(dictTable) {
    return (dictTable['1']?.length || 0) +
      (dictTable['5']?.length || 0) +
      (dictTable['9']?.length || 0);
  }

  function calculationTalents(dictTable) {
    return (dictTable['7']?.length || 0) +
      (dictTable['8']?.length || 0) +
      (dictTable['9']?.length || 0);
  }

  function calculationFamilyLife(dictTable) {
    return (dictTable['4']?.length || 0) +
      (dictTable['5']?.length || 0) +
      (dictTable['6']?.length || 0);
  }

  function calculationSelfAssessment(dictTable) {
    return (dictTable['1']?.length || 0) +
      (dictTable['2']?.length || 0) +
      (dictTable['3']?.length || 0);
  }

  function calculateHealth(lifeCode) {
    const healthMap = {
      '1': 'Мозг, сосуды. ',
      '2': 'Горло, щитовидная железа. ',
      '3': 'Сердце, лёгкие. ',
      '4': 'Поджелудочная железа. ',
      '5': 'Желудок. ',
      '6': 'Половые органы. '
    };
    return Array.from(lifeCode).map((char, i) =>
      (char === '0' || char === '1') ? (healthMap[(i + 1).toString()] || '') : ''
    ).join('');
  }

  function calculateStone(destiny) {
    return {
      '1': 'Рубин',
      '2': 'Коралл',
      '3': 'Топаз',
      '4': 'Изумруд',
      '5': 'Бирюза',
      '6': 'Сапфир',
      '7': 'Аметист',
      '8': 'Розовый Кварц',
      '9': 'Алмаз и Жемчуг'
    }[destiny];
  }

  function calculationRichiCode(formattedDate) {
    function reduceNumber(n) {
      n = String(n);
      while (n.length > 1) {
        n = String(Array.from(n).reduce((sum, d) => sum + parseInt(d), 0));
      }
      return parseInt(n);
    }
    const [day, month, year] = formattedDate.split('.').map(reduceNumber);
    const temp = reduceNumber(day + month + year);
    const rich = parseInt(`${day}${month}${year}${temp}`);
    const fortune = parseInt(`${rich}${reduceNumber(Array.from(String(rich)).reduce((s, d) => s + parseInt(d), 0))}`);
    return [rich, fortune];
  }

  function calculateMaleFemale(listTable) {
    const digitsStr = listTable.filter(x => x && x !== '-').join('');
    let male = 0;
    let female = 0;
    for (let i = 0; i < digitsStr.length; i++) {
      const digit = parseInt(digitsStr[i]);
      digit % 2 === 1 ? male++ : female++;
    }
    return `М-${male}, Ж-${female}`;
  }

  function calculateForecastYear(formattedDate, currentYear) {
    const forecastYear = currentYear && currentYear.trim() !== '' ? currentYear : getCurrentYear();
    const dayMonthSum = formattedDate.replace(/\./g, '').slice(0, 4).split('').reduce((sum, d) => sum + parseInt(d), 0);
    const sumYear = forecastYear.split('').reduce((sum, d) => sum + parseInt(d), 0);
    const result = String(dayMonthSum + sumYear);
    return result.length > 1 ? numberDestiny(result) : result;
  }

  function calculateLunaSunCode(lifeCode, inputYear) {
    const life = parseInt(lifeCode, 10);
    const year = parseInt(inputYear && inputYear.trim() !== '' ? inputYear : getCurrentYear(), 10);
    if (isNaN(life) || isNaN(year) || year === 0) return [0, 0, 0];
    const division = life / year;
    const lunaSunCode = String(division).replace('.', '').slice(0, 4).padEnd(4, '0');
    const luna = (parseInt(lunaSunCode[0]) || 0) + (parseInt(lunaSunCode[1]) || 0);
    const sun = (parseInt(lunaSunCode[2]) || 0) + (parseInt(lunaSunCode[3]) || 0);
    let total = sun - luna;
    if (total < -10 || total > 10) {
      const totalStr = String(total);
      if (totalStr.length > 1) {
        total = (parseInt(totalStr.slice(0, -1)) || 0) - (parseInt(totalStr.slice(-1)) || 0);
      }
    }
    return [sun, luna, total];
  }

  // === END PART 2 ===

  // === START PART 3 ===

  function calculateFatefulYear(lifeCode) {
    const result = [];
    const yearsTable = Array.from({ length: 6 }, (_, j) =>
      Array.from({ length: 17 }, (_, i) => i * 6 + j)
    );
    for (let colIdx = 0; colIdx < 6; colIdx++) {
      if (lifeCode[colIdx] === '0') {
        for (const year of yearsTable[colIdx]) {
          if (year === 0) continue;
          const divisionResult = Math.round(parseInt(lifeCode) / year);
          const divisionStr = divisionResult.toString();
          const thirdDigit = divisionStr.length > 2 ? divisionStr[2] : '0';
          if (thirdDigit === '0') result.push(year.toString());
        }
      }
    }
    return [...new Set(result)].sort((a, b) => parseInt(a) - parseInt(b)).join(',') || '';
  }

  function calculateCodeBehaviour(dayMonth) {
    const zodiacRanges = {
      'aquarius': [20, 1, 18, 2],
      'pisces': [19, 2, 20, 3],
      'aries': [21, 3, 20, 4],
      'taurus': [21, 4, 20, 5],
      'gemini': [21, 5, 20, 6],
      'cancer': [21, 6, 22, 7],
      'leo': [23, 7, 22, 8],
      'virgo': [23, 8, 23, 9],
      'libra': [24, 9, 23, 10],
      'scorpio': [24, 10, 21, 11],
      'sagittarius': [22, 11, 21, 12],
      'capricorn': [22, 12, 19, 1]
    };
    const zodiacDescriptions = {
      'aquarius': 'Поведения человека: Перемены Код перемен. Он принадлежит тем людям, которые родились с 20 января по 18 февраля включительно. Этой категории людей необходимо постоянно что-то менять: причёску, стиль одежды, элементарно делать перестановку в доме. Поехать на работу по новому маршруту. Им необходимо постоянно путешествовать, так как опять же, это перемена места, декораций. Иметь разные увлечения, хобби. Если у людей, родившихся в этот период, не происходит изменений, у них в жизни начинается застой и всё идёт не так, как им хотелось бы, поэтому, если вы входите в эту категорию людей, помните всегда об этом и старайтесь вносить хотя бы минимальные перемены в свою жизнь. Хочу обратиться к родителям, чьи дети с данным кодом поведения. Если вам кажется, что ваш ребёнок ветреный, так как меняет постоянно увлечения, мечется то к одному виду спорта, то к другому, либо вообще занимался спортом, а затем ушёл в искусство, не ограничивайте его, поощряйте его интересы. Это здорово, что он меняет направления, так он идёт по своему пути, перемены в его жизни необходимы. Позвольте ему пробовать себя в разном. Поверьте, со временем он сделает верный выбор и найдёт то, что ему действительно по душе.',
      'pisces': 'Поведения человека: Праздник - всегда должны радоваться. Если вы родились с 19 февраля по 20 марта — ваш код поведения — праздник. Вы способны из каждого дня, из любой мелочи сделать праздник, такие люди, как правило, яркие, позитивные, с ними всегда весело и интересно. Ваша задача — превращать даже рутину во что-то необычное и праздничное. Например, обычную уборку квартиры увлекательным процессом. Рабочий день превратить в весёлый и необычный. Больше смеха, радости и позитива — это то, что требует от вас ваш код поведения. Наверняка вы знаете мою жену Клару. Это яркий представитель людей с таким кодом поведения. Вы сами видите, что улыбка и смех не сходят с её лица, она живая, интересная, позитивная, звонкая. И в её жизни всё складывается наилучшим образом, потому что она следует своему коду поведения.',
      'aries': 'Поведения человека: Переживание Если вы родились в период с 21 марта по 20 апреля — вам официально разрешено переживать. Удивительно, парадоксально, но именно тогда, когда вы переживаете, ваши проблемы и неприятные ситуации решаются каким-то чудесным образом. Естественно, здесь, как и везде, должна быть золотая середина. Но главная особенность рождённых в этот период заключается именно в этом Если люди из другой категории, с другим кодом поведения, в сложной ситуации будут переживать, у них всё начнёт рушиться, и ситуация только усугубится. У вас же всё совершенно наоборот. И я часто слышал от своих клиентов с этим кодом, что они сами замечали, что в трудных ситуациях они начинают переживать и сами не понимают, как всё разрешилось наилучшим образом.',
      'taurus': 'Поведения человека: Независимость Рождённые с 21 апреля по 20 мая, ваш код поведения — независимость. Здесь речь как о финансовой, так и духовной независимости. Если вы привязываетесь эмоционально к человеку, растворяетесь в нём и теряете себя, ставите его выше своих интересов — это ваша главная ошибка. Вам ни в коем случае этого делать нельзя. Есть даже закономерность, что тельцам чаще изменяют, тельцов чаще предают. Потому что своей эмоциональной привязанностью они душат другого человека и провоцируют на такое поведение. Поэтому, чтобы в вашей жизни складывалось всё хорошо, возьмите себе за правило — не привязываться ни к кому, ни эмоционально, ни финансово.',
      'gemini': 'Поведения человека: Мечтать о фантастическом Если вы родились в период с 21 мая по 20 июня, ваш код поведения — мечтать о фантастическом. Я хочу сказать, что вам очень повезло, так как всё, о чём вы мечтаете, реализуется в вашей жизни, даже если ваши мечты кажутся вам чем-то нереальным, фантастическим. Ваш код так и говорит — мечтать о ФАНТАСТИЧЕСКОМ. Эти, казалось бы, несбыточные желания сбываются для вас. Такие люди могут на мечтать себе роскошную жизнь, вторую половинку, любые события, которые будут с ними происходить. Главное — делайте это, мечтайте, не считайте это глупостью, ребячеством. Вам официально разрешено мечтать и визуализировать. Попробуйте прямо сейчас вспомнить, о чём вы мечтали с детства, а может быть, и в более зрелом возрасте. Я уверен, что есть не один пример из вашей жизни, где ваши мечты стали реальностью. А если вы никогда не мечтали или в какой-то момент прекратили это делать, попробуйте, у вас обязательно получится превратить ваши мечты в реальность.',
      'cancer': 'Поведения человека: Претендовать на большее Если вы родились с 21 июня по 22 июля, ваш код поведения — всегда претендовать на большее. И если человек из данной категории скажет мне, что у него не получается, что он потратил уже все силы, но так и не пришёл к нужному результату, не поверю. Вы те люди, которые никогда не должны останавливаться на достигнутом, и даже если вам возможностей, это не так. Поднимайтесь каждый раз на ступеньку выше. Выходите на новый уровень, стремитесь достичь ещё большего, чем имеете на данный момент. У вас большое преимущество перед другими. У вас есть этот потенциал постоянно достигать новых вершин. Как только вы останавливаетесь на достигнутом, вы идёте не по своему пути теряете связь с самим собой, вам становится некомфортно. Поэтому не жалейте себя стремитесь к большему, развивайтесь, достигайте! У вас всё обязательно получится.',
      'leo': 'Поведения человека: Должны вести как короли Рождённые с 23 июля по 22 августа, ваш код поведения — король или королева. Эти люди и родились в знак Льва. И они действительно должны вести себя как лев, царь зверей. Лев чувствует своё превосходство над другими, он знает себе цену, у него голова всегда приподнята. Он ведёт себя достойно, он справедлив, честен, умён. Его взгляд, манера, поведение — всё наполнено царственностью и величием. Но обратите внимание, при этом львы никого не унижают, не самоутверждаются за счёт других. Это большая разница. Им не нужно никому доказывать, что они достойные и их нужно любить и уважать. Они такие и есть. И это чувствуют другие. Вот так должны вести себя люди с кодом поведения — король или королева. Скорее всего, в них это уже заложено с рождения, главное, не терять это и помнить о своём достоинстве.',
      'virgo': 'Поведения человека: Самолюбование Если вы родились в период с 23 августа по 23 сентября, ваш код — самолюбование. Вам нужно заявлять о себе и признавать, что вы лучшая или лучший, причём это касается всех сфер: карьера, семья, личностная сфера и т.д. Где бы вы ни были и какую социальную роль ни выполняли бы, вы должны говорить о том, что вы лучшая или лучший. Главное делать это искренне, тогда и другие будут это чувствовать и признавать. Людям с таким кодом необходимо выходить в социальные сети. Можно показывать свою личную жизнь или то, что вы хотели бы. Удивительно, но, как правило, людей, рождённых в этот период, всегда интересно смотреть, о чём бы они ни говорили и что бы они ни показывали, даже если вы будете показывать в соц.сетях свою обычную повседневную жизнь, людям будет интересно за вами наблюдать.',
      'libra': 'Поведения человека: Стервозность, подкалывать свое окружение Рожденные с 24 сентября по 23 октября — ваш код поведения стервозность. Вам разрешено подкалывать других людей, подшучивать над ними, проявлять стервозность. Но я прошу не путать это с наглостью и хамством. Опять повторюсь про золотую серединку. Можно подкалывать людей, не обижая, не унижая и не оскорбляя их. Делать это красиво, как в принципе и умеют многие женщины. Вести себя легко, играючи, иронизировать и подкалывать по- доброму, без агрессии и унижения — вот о чём говорит ваш код поведения. Когда люди под этим знаком ведут себя так, в их жизни складывается всё наилучшим образом для них, и они притягивают удачу. Кстати, если говорить о рождённых в этот период, им ни в коем случае нельзя переживать, иначе они притягивают негативные события в свою жизнь.',
      'scorpio': 'Поведения человека: Не высовываться, вести себя как обиженный ребенок Если вы родились в период с 24 октября по 21 ноября, ваш код поведения — вести себя, как обиженный ребёнок. Конечно, не в прямом смысле, но какое-то сходство между этой фразой и вашим поведением есть. Смотрите, этим людям очень выгодно быть в тени, тише воды ниже травы, не высовываться и быть незамеченным. Иначе говоря, быть серой мышкой. У многих этот образ ассоциируется с неудачником, несостоявшимся человеком. Но именно этим рождённым в этот период, очень выгодно так себя вести. Именно такое поведение приносит удачу и успех в их жизнь. Давайте приведу пример. Есть люди блогеры, которые всё время на виду, они проявляются, их знают многие. Кто- то их любит, кто-то хейтит, но они как на сцене, всё время себя показывают. А есть люди, которые помогают этим блогерам, пишут для них тексты, составляют какие-то сценарии, делают рекламу, собирают аудиторию. Этих людей не видно, о них никто не знает и не слышит. Но они играют большую роль. Популярность этих блогеров в большой степени — заслуга этих так называемых серых кардиналов. Вот какое поведение я имею в виду. И если вы, рождённые в этот период, будете вести себя так, поверьте, вы будете удачливы и успешны.',
      'sagittarius': 'Поведения человека: Облагораживать пространство, к примеру, свой дом и т.д. Если вы родились в период с 22 ноября по 21 декабря, ваш код поведения — облагораживать своё пространство. Вы из тех людей, кто умеет видеть красоту, имеет чувство стиля. Как правило, у таких людей очень красивый дом, так как они сами организуют это пространство. Эти люди могут реализовать себя в дизайнерстве, могут быть флористами, заниматься реставрацией. Всё, что связано с индустрией красоты, это для них. Кроме того, они должны украшать не только окружающие их места, но и самих себя — вот такое поведение принесёт им успех.',
      'capricorn': 'Поведения человека: Должны делать карьеру, чтобы все им все помогали (родные и.т.д.) Последний код поведения, он принадлежит тем, кто родился в период с 22 декабря по 19 января. К чёрту эту гордость! Есть такая песня у Сергея Жукова. Именно вам, рождённым в этот период, необходимо убрать свою гордость и начать просить о помощи. Для вас очень важна карьера и продвижение. И ещё очень важно научиться просить других помогать вам в этом, потому что достигать больших высот вы можете с помощью других людей. Делать это в одиночку вам намного сложнее, у вас есть эта возможность обращаться к людям и, скорее всего, они вам будут помогать. Так ваши дела будут идти с наивысшим успехом. Хочу обратиться к девушкам, женщинам, рождённым в этот период. Вам ни в коем случае нельзя быть домохозяйками, для вас очень важна карьера, ваше развитие и реализация, поэтому какое- то хотя бы хобби вы должны иметь, иначе роль домохозяйки приведёт вас к апатии, вы будете чувствовать себя не на своём месте.'
    };
    const [day, month] = dayMonth.split('.').map(Number);
    for (const [sign, [sd, sm, ed, em]] of Object.entries(zodiacRanges)) {
      if ((month === sm && day >= sd) || (month === em && day <= ed)) return zodiacDescriptions[sign];
    }
    return 'Не удалось определить знак зодиака';
  }

  function calculateMatrix() {
    const birthdate = birthdateInput.value;
    const yourName = nameInput.value.trim().toLowerCase();
    const inputYear = inputYearInput.value;

    if (!birthdate || !yourName) {
      alert('Введите корректную дату рождения и имя!');
      return;
    }

    const [year, month, day] = birthdate.split('-');
    const formattedDate = `${day}.${month}.${year}`;
    const dayMonth = formattedDate.split('.').slice(0, 2).join('.');

    const totalNumbers = technicalLayout(formattedDate);
    const { cleanedDate, body, soul } = totalNumbers;

    // Первая таблица по дате
    const dictTable = calculateTablePiphagor(totalNumbers);
    const listTable = Object.values(dictTable);

    // Считаем число имени
    const nameTable = { 1: 'аисъ', 2: 'бйты', 3: 'вкуь', 4: 'глфэ', 5: 'дмхю', 6: 'енця', 7: 'ёоч', 8: 'жпш', 9: 'зрщ' };
    let nameSum = 0;
    for (let c of yourName) {
      for (let k in nameTable) {
        if (nameTable[k].includes(c)) {
          nameSum += parseInt(k);
          break;
        }
      }
    }
    let nameDigit = nameSum;
    while (nameDigit >= 10) {
      nameDigit = nameDigit.toString().split('').reduce((a, b) => a + parseInt(b), 0);
    }

    // Вторая таблица по дате + числу имени
    const dictTableWithName = calculateTablePiphagorWithName(totalNumbers, nameDigit);
    const listTableWithName = Object.values(dictTableWithName);

    const [ch, en, in_, hl, lg, lb, cr, lk, mem] = listTable;

    const destiny = numberDestiny(formattedDate);
    const lifeCode = calculateLifeCode(formattedDate);
    const luckie = calculateLuckie(destiny);
    const reincarnation = calculateReincarnation(listTable);
    const temperament = calculationTemperament(dictTable);
    const [rich, fortune] = calculationRichiCode(formattedDate);
    const maleFemale = calculateMaleFemale(listTable);
    const [sun, luna, total] = calculateLunaSunCode(lifeCode, inputYear);
    const fatefulYear = calculateFatefulYear(lifeCode);
    const forecastYear = calculateForecastYear(formattedDate, inputYear);
    const stone = calculateStone(destiny);
    const healthDescription = calculateHealth(lifeCode);
    const codeBehaviour = calculateCodeBehaviour(dayMonth);
    const lifeCodeValue = getLifeCodeValue(lifeCode);

    const realization = calculationRealization(dictTable);
    const helpingTheFamily = calculationHelpingFamily(dictTable);
    const habits = calculationHabits(dictTable);
    const selfAssessment = calculationSelfAssessment(dictTable);
    const familyLife = calculationFamilyLife(dictTable);
    const talent = calculationTalents(dictTable);
    const spirituality = calculationSpirituality(dictTable);

    renderTables(
      formattedDate, ch, en, in_, hl, lg, lb, cr, lk, mem,
      destiny, temperament, body, soul, nameDigit, codeBehaviour,
      realization, helpingTheFamily, habits, selfAssessment, familyLife,
      talent, spirituality, maleFemale, rich, fortune, sun, luna,
      total, forecastYear, lifeCode, luckie, reincarnation, lifeCodeValue,
      stone, fatefulYear, healthDescription,
      listTableWithName // 👈 передаём отдельный массив для второй таблицы
    );
    makeCellsClickable();
  }

  // === END PART 3 ===

  // === START PART 4 ===

  function addCellNumber(cellText, number) {
    return `<div class="cell-number">${number}</div>${cellText.replace(/\n/g, '<br>')}`;
  }

  function buildHTMLTable(rows, headers, addNumbers = false) {
    let thead = `<thead><tr>${headers.map(h => `<th>${h.replace(/\n/g, '<br>')}</th>`).join('')}</tr></thead>`;
    let tbody = '<tbody>';
    rows.forEach((row, rowIndex) => {
      tbody += '<tr>';
      row.forEach((cell, colIndex) => {
        if (addNumbers && rowIndex < 3 && colIndex < 3) {
          const number = rowIndex * 3 + colIndex + 1;
          tbody += `<td class="numbered-cell">${addCellNumber(cell, number)}</td>`;
        } else {
          tbody += `<td>${cell.replace(/\n/g, '<br>')}</td>`;
        }
      });
      tbody += '</tr>';
    });
    tbody += '</tbody>';
    return `<table class="result-table bordered">${thead}${tbody}</table>`;
  }

  function renderTables(
    date, ch, en, in_, hl, lg, lb, cr, lk, mem,
    destiny, temperament, body, soul, nameDigit, codeBehaviour,
    realization, helpingTheFamily, habits, selfAssessment, familyLife,
    talent, spirituality, maleFemale, rich, fortune, sun, luna,
    total, forecastYear, lifeCode, luckie, reincarnation, lifeCodeValue,
    stone, fatefulYear, healthDescription,
    listTableWithName
  ) {
    const matrixTable = document.getElementById('matrixTable');
    const nameMatrixTable = document.getElementById('nameMatrixTable');
    const extraTable = document.getElementById('extraTable');
    const behaviorTable = document.getElementById('behaviourTable');

    // 👉 первая таблица — только по дате
    matrixTable.innerHTML = buildHTMLTable([
      [`Характер\n${ch}`, `Здоровье\n${hl}`, `Харизма\n${cr}`, `Самореализация\n${realization}`],
      [`Энергия\n${en}`, `Логика\n${lg}`, `Удача\n${lk}`, `Помощь семье\n${helpingTheFamily}`],
      [`Интерес\n${in_}`, `Труд\n${lb}`, `Память\n${mem}`, `Привычки\n${habits}`],
      [`Самооценка\n${selfAssessment}`, `Семья, быт\n${familyLife}`, `Талант\n${talent}`, `Духовность\n${spirituality}`]
    ], [`Дата рождения\n${date}`, `Энергетика\n${maleFemale}`, `Число судьбы\n${destiny}`, `Темперамент\n${temperament}`], true);

    // 👉 вторая таблица — по дате + числу имени
    nameMatrixTable.innerHTML = buildHTMLTable([
      [`Характер\n${listTableWithName[0]}`, `Здоровье\n${listTableWithName[3]}`, `Харизма\n${listTableWithName[6]}`, `Самореализация\n${realization}`],
      [`Энергия\n${listTableWithName[1]}`, `Логика\n${listTableWithName[4]}`, `Удача\n${listTableWithName[7]}`, `Помощь семье\n${helpingTheFamily}`],
      [`Интерес\n${listTableWithName[2]}`, `Труд\n${listTableWithName[5]}`, `Память\n${listTableWithName[8]}`, `Привычки\n${habits}`],
      [`Самооценка\n${selfAssessment}`, `Семья, быт\n${familyLife}`, `Талант\n${talent}`, `Духовность\n${spirituality}`]
    ], [`Дата рождения\n${date}`, `Энергетика\n${maleFemale}`, `Число судьбы\n${destiny}`, `Темперамент\n${temperament}`], true);

    // 👉 таблица дополнений
    extraTable.innerHTML = buildHTMLTable([
      [`Код Богатства:\n${rich}`, `Ваш камень удачи:\n${stone}`, `Прогноз Солнца:\n${sun}`, `Здоровье:\n${healthDescription}`],
      [`Код Удачи:\n${fortune}`, `Число имени:\n${nameDigit}`, `Прогноз Луны:\n${luna}`, `Годы Рока:\n${fatefulYear}`],
      [`Тех.расклад Тела:\n${body}`, `Тех.расклад Души:\n${soul}`, `Итог года:\n${total}`, `Персональное\nчисло:\n${forecastYear}`]
    ], [`Жизненный код:\n${lifeCode}`, `Счастливые числа:\n${luckie}`, `Зрелость души:\n${reincarnation}`, `Психотип личности:\n${lifeCodeValue}`], false);

    // 👉 таблица поведения
    behaviorTable.innerHTML = buildHTMLTable(
      [[codeBehaviour]],
      ['Код поведения по дате рождения'],
      false
    );
  }

  function makeCellsClickable() {
    // ячейки 1–9 в двух первых таблицах
    document.querySelectorAll('#matrixTable td.numbered-cell, #nameMatrixTable td.numbered-cell').forEach(td => {
      const numberDiv = td.querySelector('.cell-number');
      if (!numberDiv) return;
      const cellNum = numberDiv.textContent.trim();
      const digits = td.innerText.split('\n')[1] || '';
      const val = digits.replace(/\D/g, '') || '0';
      td.style.cursor = 'pointer';
      td.addEventListener('click', () => {
        window.open(`source/psicho/${cellNum}/${val}.txt`, '_blank');
      });
    });

    // Дополнения: тело
    const bodyCell = [...document.querySelectorAll('#extraTable td')].find(td => td.innerText.includes('Тех.расклад Тела'));
    if (bodyCell) {
      const bodyVal = bodyCell.innerText.split('\n')[1] || '0';
      bodyCell.style.cursor = 'pointer';
      bodyCell.addEventListener('click', () => {
        window.open(`source/bodysoul/${bodyVal}.txt`, '_blank');
      });
    }

    // Дополнения: душа
    const soulCell = [...document.querySelectorAll('#extraTable td')].find(td => td.innerText.includes('Тех.расклад Души'));
    if (soulCell) {
      const soulVal = soulCell.innerText.split('\n')[1] || '0';
      soulCell.style.cursor = 'pointer';
      soulCell.addEventListener('click', () => {
        window.open(`source/bodysoul/${soulVal}.txt`, '_blank');
      });
    }

    // Дополнения: итог года
    const totalCell = [...document.querySelectorAll('#extraTable td')].find(td => td.innerText.includes('Итог года'));
    if (totalCell) {
      const totalVal = totalCell.innerText.split('\n')[1] || '0';
      totalCell.style.cursor = 'pointer';
      totalCell.addEventListener('click', () => {
        window.open(`source/sunmoon/${totalVal}.txt`, '_blank');
      });
    }

    // Дополнения: персональное число
    const forecastCell = [...document.querySelectorAll('#extraTable td')].find(td => td.innerText.includes('Персональное'));
    if (forecastCell) {
      const forecastVal = forecastCell.innerText.split('\n')[1] || '0';
      forecastCell.style.cursor = 'pointer';
      forecastCell.addEventListener('click', () => {
        window.open(`source/persyear/${forecastVal}.txt`, '_blank');
      });
    }
  }

}); // конец DOMContentLoaded

function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('show');
}

// === END PART 4 ===
