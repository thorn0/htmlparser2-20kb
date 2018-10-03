const htmlparser = require('../dist/htmlparser2-20kb');

test('it works', () => {
    expect(htmlparser.serialize(htmlparser.utils.create('div'))).toBe(
        '<div></div>'
    );
    expect(htmlparser.serialize(htmlparser.utils.create('div', null))).toBe(
        '<div></div>'
    );
    expect(
        htmlparser.serialize(htmlparser.utils.create('div', { class: 'foo' }))
    ).toBe('<div class="foo"></div>');
    expect(
        htmlparser.serialize(
            htmlparser.utils.create('div', { class: 'foo' }, 'bar')
        )
    ).toBe('<div class="foo">bar</div>');
    var node = htmlparser.utils.create(
        'div',
        { class: 'foo' },
        'bar',
        htmlparser.utils.create('strong', null, 'baz')
    );
    expect(htmlparser.serialize(node)).toBe(
        '<div class="foo">bar<strong>baz</strong></div>'
    );
    expect(node.children[1].prev.data).toBe('bar');
    expect(node.children[1].parent).toBe(node);
    expect(
        htmlparser.serialize(
            htmlparser.utils.create('div', { class: 'foo' }, [
                'bar',
                htmlparser.utils.create('strong', null, 'baz')
            ])
        )
    ).toBe('<div class="foo">bar<strong>baz</strong></div>');
    expect(
        htmlparser.serialize(
            htmlparser.utils.create(
                'div',
                { class: 'foo' },
                ['bar', htmlparser.utils.create('strong', null, 'baz')],
                'qux'
            )
        )
    ).toBe('<div class="foo">bar<strong>baz</strong>qux</div>');
});

test('ignore empty children', () => {
    var node = htmlparser.utils.create(
        'div',
        undefined,
        'x',
        null,
        undefined,
        '',
        'y'
    );
    expect(htmlparser.serialize(node)).toBe('<div>xy</div>');
});

test('maintains consistency of the donor tree when taking nodes from it', () => {
    var donor = htmlparser.parse(
        '<p>foo <strong>bar</strong><em>baz</em></p>'
    )[0];
    var strong = donor.children[1];
    expect(strong.name).toBe('strong');
    var created = htmlparser.utils.create('div', undefined, 'qux', strong);
    expect(htmlparser.serialize(created)).toBe(
        '<div>qux<strong>bar</strong></div>'
    );
    expect(donor.children.length).toBe(2);
    expect(donor.children[0].next.name).toBe('em');
});

test('CSS classes shortcut', () => {
    expect(htmlparser.serialize(htmlparser.utils.create('span.foo'))).toBe(
        '<span class="foo"></span>'
    );
    expect(htmlparser.serialize(htmlparser.utils.create('span.foo.zoo'))).toBe(
        '<span class="foo zoo"></span>'
    );
    expect(htmlparser.serialize(htmlparser.utils.create('.foo'))).toBe(
        '<div class="foo"></div>'
    );
});

test('misc #1', () => {
    const markup =
        '<layout><field name="a"></field><field name="b"/><foo/></layout>';
    const el = htmlparser.parse(markup, { recognizeSelfClosing: true })[0];
    const fields = [];
    for (const child of el.children.slice()) {
        htmlparser.utils.removeElement(child);
        if (child.name === 'field') {
            fields.push(child);
            const div = htmlparser.utils.create('div', null, child);
            htmlparser.utils.appendChild(el, div);
        }
    }
    expect(fields.length).toBe(2);
    expect(htmlparser.serialize(el)).toBe(
        '<layout><div><field name="a"></field></div><div><field name="b"></field></div></layout>'
    );
});
