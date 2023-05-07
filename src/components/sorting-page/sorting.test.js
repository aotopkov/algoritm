import { sortArr } from "./sorting-func"

describe('тsorting test', () => {
    test('сортировкая пустого массива выбором', () => {
        expect(sortArr('Ascend', [], 'vote')).toEqual([])
    })
    test('сортировкая пустого массива пузырьком', () => {
        expect(sortArr('Ascend', [], 'bubble')).toEqual([])
    })
    test('сортировкая массива из одного элемента', () => {
        expect(sortArr('Ascend', [1], 'vote')).toEqual([1])
    })
    test('сортировкая массива из одного элемента', () => {
        expect(sortArr('Ascend', [1], 'bubble')).toEqual([1])
    })
    test('сортировкая массива из одного элемента', () => {
        expect(sortArr('Ascend', [5,4,3,2,1], 'vote')).toEqual([1,2,3,4,5])
    })
    test('сортировкая массива из одного элемента', () => {
        expect(sortArr('Ascend', [5,4,3,2,1], 'bubble')).toEqual([1,2,3,4,5])
    })
})