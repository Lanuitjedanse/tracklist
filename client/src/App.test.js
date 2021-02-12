console.log("testing");
import App from "./App";
import { render, waitFor, fireEvent } from "@testing-library/react";
import axios from "./Axios";

jest.mock("./Axios");

axios.get.mockResolvedValue({
    data: {
        firstName: "Loulou",
        lastName: "Bellou",
        profilePicUrl: "https://www.fillmurray.com/500/500",
        id: 1,
    },
});

// test("app stuff", async () => {
//     // const test = render(<App />);
//     // console.log("test: ", test);
//     const { container } = render(<App />);
//     console.log("container.innerHTML: ", container.innerHTML);

//     expect(container.innerHTML).toContain("spinner");

//     await waitFor(() => container.querySelector(".app"));
//     expect(container.innerHTML).toContain("h2");

//     console.log("container.innerHTML: ", container.innerHTML);
//     const smallProfilePic = container.querySelector("img");
//     fireEvent.click(smallProfilePic);
//     expect(container.innerHTML).toContain("uploader");
// });

// const myMockFn = jest.fn((n) => n >= 18);

// test("filter calls function properly", () => {
//     const a = [22, 15, 37];
//     a.filter(myMockFn);
//     console.log("myMockFn.mock: ", myMockFn.mock);

//     // check that filter calls the method for each element in the array
//     expect(myMockFn.mock.calls.length).toBe(3);

//     //check that the first element "passes" the filter check
//     expect(myMockFn.mock.results[0].value).toBeTruthy();

//     //check that the second element "fails" the filter check
//     expect(myMockFn.mock.results[1].value).toBe(false);
// });
