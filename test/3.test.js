const mod=require("./../src/js/3.js");
test("fab 7",()=>{
  expect(mod.fab(7)).toBe(13);
});
test("fab 1~5",()=>{
  expect(mod.fab(7)).toBe(1);
  expect(mod.fab(7)).toBe(1);
  expect(mod.fab(7)).toBe(2);
  expect(mod.fab(7)).toBe(3);
  expect(mod.fab(7)).toBe(5);
});