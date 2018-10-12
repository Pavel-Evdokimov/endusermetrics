import { Selector } from "testcafe";

fixture`Test select element`.page`http://localhost:3010`;

const citySelect = Selector("#city");
const cityOption = citySelect.find("option");

test(`Select an option from the drop-down menu`, async t => {
  await t
    .wait(7000)
    // .debug()
    .expect(citySelect.value)
    .eql("London");
});
