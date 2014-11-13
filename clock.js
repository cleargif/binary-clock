$(function() {

  function FormatNumberLength(num, length) {
    var r = "" + num;
    while (r.length < length) {
      r = "0" + r;
    }
    return r;
  }

  var helperStr = {
    '0': 'h',
    '1': 'h',
    '2': 'm',
    '3': 'm',
    '4': 's',
    '5': 's',
  };

  var template = [
    '{{#each .}}',
      '<li>',
        '<ul>',
          '{{#each .}}',
            '<li>{{this}}</li>',
          '{{/each}}',
          '<li>{{helperStr}}</li>',
        '</ul>',
      '</li>',
    '{{/each}}'
  ].join('\n');

  var tmpl = Handlebars.compile(template);
  Handlebars.registerHelper("helperStr", function(obj, fn) {
    return helperStr[obj.data.index];
  });

  setInterval(function() {


    var date = new Date().toTimeString().split(' ')[0].replace(/:/g, '').split('');

    for (var i in date) {
      date[i] = FormatNumberLength(parseInt(date[i], 10).toString(2), 4);
      date[i] = date[i].split('');
    }


    $('#wrapper').html(tmpl(date));
    // h h : m m : s s
    // 2 1 : 4 5 : 5 6
  }, 1000);

});