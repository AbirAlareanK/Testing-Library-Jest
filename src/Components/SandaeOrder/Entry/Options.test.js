import {render , screen} from "@testing-library/react";
import Options from "./Options";

test('Displays image from each scoop from the server' , async () => {
    render(<Options optionType="scoops"/>);

    const scoopImages = await screen.findAllByRole('img' , {name : /scoop$/i});
    expect(scoopImages).toHaveLength(2);

    const altImages = scoopImages.map((e) => e.alt);
    expect(altImages).toEqual(['Chocolate scoop' , 'Vanilla scoop']);

})