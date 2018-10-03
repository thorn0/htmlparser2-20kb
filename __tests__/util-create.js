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
