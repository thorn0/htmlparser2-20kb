const hp = require('../dist/htmlparser2-20kb');

test('it works', () => {
    expect(hp.serialize(hp.utils.create('div'))).toBe('<div></div>');
    expect(hp.serialize(hp.utils.create('div', null))).toBe('<div></div>');
    expect(hp.serialize(hp.utils.create('div', { class: 'foo' }))).toBe(
        '<div class="foo"></div>'
    );
    expect(hp.serialize(hp.utils.create('div', { class: 'foo' }, 'bar'))).toBe(
        '<div class="foo">bar</div>'
    );
    var node = hp.utils.create(
        'div',
        { class: 'foo' },
        'bar',
        hp.utils.create('strong', null, 'baz')
    );
    expect(hp.serialize(node)).toBe(
        '<div class="foo">bar<strong>baz</strong></div>'
    );
    expect(node.children[1].prev.data).toBe('bar');
    expect(node.children[1].parent).toBe(node);
    expect(
        hp.serialize(
            hp.utils.create('div', { class: 'foo' }, [
                'bar',
                hp.utils.create('strong', null, 'baz')
            ])
        )
    ).toBe('<div class="foo">bar<strong>baz</strong></div>');
    expect(
        hp.serialize(
            hp.utils.create(
                'div',
                { class: 'foo' },
                ['bar', hp.utils.create('strong', null, 'baz')],
                'qux'
            )
        )
    ).toBe('<div class="foo">bar<strong>baz</strong>qux</div>');
});

test('maintains consistency of the donor tree when taking nodes from it', () => {
    var donor = hp.parse('<p>foo <strong>bar</strong><em>baz</em></p>')[0];
    var strong = donor.children[1];
    expect(strong.name).toBe('strong');
    var created = hp.utils.create('div', undefined, 'qux', strong);
    expect(hp.serialize(created)).toBe('<div>qux<strong>bar</strong></div>');
    expect(donor.children.length).toBe(2);
    expect(donor.children[0].next.name).toBe('em');
});
