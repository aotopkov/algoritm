import React from "react";
import { render } from "@testing-library/react";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";


describe('circle test', function() {
    test('without text', function() {
        const circle = render(<Circle></Circle>)
        expect(circle).toMatchSnapshot()
    }) 

    test('with text', function() {
        const circle = render(<Circle>text</Circle>)
        expect(circle).toMatchSnapshot()
    })

    test('with head', function() {
        const circle = render(<Circle head={'text'}></Circle>)
        expect(circle).toMatchSnapshot()
    })

    test('with react head', function() {
        const circle = render(<Circle head={<Circle/>}></Circle>)
        expect(circle).toMatchSnapshot()
    })

    test('with tail', function() {
        const circle = render(<Circle tail={'text'}></Circle>)
        expect(circle).toMatchSnapshot()
    })

    test('with react tail', function() {
        const circle = render(<Circle tail={<Circle/>}></Circle>)
        expect(circle).toMatchSnapshot()
    })

    test('with index', function() {
        const circle = render(<Circle index={0}></Circle>)
        expect(circle).toMatchSnapshot()
    })

    test('small circle', function() {
        const circle = render(<Circle isSmall={true}></Circle>)
        expect(circle).toMatchSnapshot()
    })

    test('default state', function() {
        const circle = render(<Circle state={ElementStates.Default}></Circle>)
        expect(circle).toMatchSnapshot()
    })

    test('changing state', function() {
        const circle = render(<Circle state={ElementStates.Changing}></Circle>)
        expect(circle).toMatchSnapshot()
    })

    test('modified state', function() {
        const circle = render(<Circle state={ElementStates.Modified}></Circle>)
        expect(circle).toMatchSnapshot()
    })

})