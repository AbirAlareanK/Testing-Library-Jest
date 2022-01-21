import {render , screen} from "../../../../Test-Utility/test-utils";
import Options from "../Options";

test('Displays image from each scoop from the server' , async () => {
    render(<Options optionType="scoops"/>);

    const scoopImages = await screen.findAllByRole('img' , {name : /scoop$/i});
    expect(scoopImages).toHaveLength(2);

    const altImages = scoopImages.map((e) => e.alt);
    expect(altImages).toEqual(['Chocolate scoop' , 'Vanilla scoop']);

})

test('Displays image from each topping from the server' , async () => {
    render(<Options optionType="toppings"/>);

    const toppingImages = await screen.findAllByRole('img' , {name : /topping$/i});
    expect(toppingImages).toHaveLength(3);

    const altImages = toppingImages.map((e) => e.alt);
    expect(altImages).toEqual(['Cherries topping' , 'M&Ms topping' , 'Hot fudge topping']);

})

