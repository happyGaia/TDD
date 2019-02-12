const sum = require('./sum');

test('count budget 1', () => {
  expect(sum([{'budgetMonth':'2019-03', 'budget':31}], {'start':'2019-03-01', 'end':'2019-03-31'})).toBe(31);
});

test('count budget 2: Feb.', () => {
  expect(sum([{'budgetMonth':'2019-02', 'budget':28}], {'start':'2019-02-01', 'end':'2019-02-28'})).toBe(28);
});

test('count budget 4: Start Date and End Dtae is same', () => {
  expect(sum([{'budgetMonth':'2019-03', 'budget':31}], {'start':'2019-03-01', 'end':'2019-03-01'})).toBe(1);
});

//cross month: simple
test('count budget 3-1: Feb. to Mar. Get Feb budget', () => {
  expect(sum([{'budgetMonth':'2019-02', 'budget':28}], {'start':'2019-02-15', 'end':'2019-03-15'})).toBe(14);
});

test('count budget 3-2: Feb. to Mar. Get March budget', () => {
  expect(sum([{'budgetMonth':'2019-03', 'budget':31}], {'start':'2019-02-15', 'end':'2019-03-20'})).toBe(20);
});

//cross month budget
test('count budget 5: Feb. to Mar. Get All Month budget', () => {
  expect(sum([{'budgetMonth':'2019-02', 'budget':28}, {'budgetMonth':'2019-03', 'budget':93}], {'start':'2019-02-28', 'end':'2019-03-01'})).toBe(4);
});

//param is empty
test('count budget 6-1: budgetInfo & durationDate is null', () => {
  expect(sum([], {})).toBe(0);
});

test('count budget 6-2: budgetInfo & durationDate is null', () => {
  expect(sum()).toBe(0);
});

//cross muti
test('count budget 7-1: Apr. to Jun. cross two month', () => {
  expect(sum([{'budgetMonth':'2019-04', 'budget':60}, {'budgetMonth':'2019-06', 'budget':120}], {'start':'2019-04-30', 'end':'2019-07-15'})).toBe(122);
});

test('count budget 7-2: Apr. to Jun. cross two month', () => {
  expect(sum([{'budgetMonth':'2019-03', 'budget':62}, {'budgetMonth':'2019-07', 'budget':124}], {'start':'2019-04-30', 'end':'2019-07-15'})).toBe(60);
});

test('count budget 7-3: Apr. to Jun. cross two month', () => {
  expect(sum([{'budgetMonth':'2019-03', 'budget':62}, {'budgetMonth':'2019-08', 'budget':124}], {'start':'2019-04-30', 'end':'2019-07-15'})).toBe(0);
});

test('count budget 7-4: Apr. to Jun. cross two month', () => {
  expect(sum([{'budgetMonth':'2019-05', 'budget':62}, {'budgetMonth':'2019-06', 'budget':120}], {'start':'2019-04-30', 'end':'2019-07-15'})).toBe(182);
});

//cross year
test('count budget 8: cross year', () => {
  expect(sum([{'budgetMonth':'2019-01', 'budget':31}, {'budgetMonth':'2020-01', 'budget':31}], {'start':'2019-01-31', 'end':'2020-01-01'})).toBe(2);
});