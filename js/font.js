Handlebars.registerHelper('fontSize', function(name, element) {
    const length = name.length;
    let size;

    if (length > 7)
        size = '0.515rem';
    else if (length > 5)
        size = '0.615rem';

    if (element === 'normal')
        return new Handlebars.SafeString('<span class="label-text" style="font-size:' + size + ';">' + name + '</span>');
    else if (element === 'hover')
        return new Handlebars.SafeString('<span class="label-text hover" style="font-size:' + size + '; display: none;">' + name + '</span>');
});