import FriendshipButton from "../FriendshipButton";
import { render, waitFor, fireEvent } from "@testing-library/react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import axios from "../Axios";

jest.mock("../Axios");

axios.get.mockResolvedValue({
    data: {
        button: "send",
    },
});

axios.post.mockResolvedValue({
    data: {
        button: "accept",
    },
});

test("Clicking on the friendship button triggers an axios post request", async () => {
    const { container } = render(<FriendshipButton id="57" />);
    const friendshipButton = container.querySelector(".btn-purple");

    expect(friendshipButton.innerHTML).toBe("Make Friendship Request");

   await  act(() => {
        fireEvent.click(friendshipButton);
        
    });

    expect(friendshipButton.innerHTML).toBe("Cancel Friendship Request");
});

// test("Clicking the Save button causes an ajax request.", async () => {
//     const { container } = render(<BioEditor bio="" />);
//     const button = container.querySelector("button");

//     fireEvent.click(button);
//     axios.post.mockResolvedValue({
//         data: {
//             bio: "I just wrote a bio",
//         },
//     });

// });

// test("Clicking the Save button causes an ajax request.", async () => {
//     const { container } = render(<BioEditor />);
//     const button = container.querySelector("button");
//     // expect(button.innerHTML).toBe("Save Bio");
//     fireEvent.click(button);

//     // expect(axios).toHaveBeenCalledWith(button);
//     // const resp = {data: bio};
//     axios.post.mockResolvedValue({
//         data: {
//             bio: "I just wrote a bio",
//         },
//     });

//     // expect(axios).toHaveBeenCalled();

//     //   const bio = { bio: "I just wrote a new bio" };
//     //   const resp = { data: bio };
//     // //   axios.post.mockResolvedValue(resp);
//     // expect(axios).toEqual("I just wrote a bio");

//     await waitFor(() => {
//         const p = container.querySelector("p");
//         expect(p).toContain("I just wrote a bio");
//     });
// });

// test("Clicking the Save button causes an ajax request.", async () => {
//     const { container } = render(<FriendshipButton />);
//     const button = container.querySelector("button");
//     // expect(button.innerHTML).toBe("Save Bio");
//     fireEvent.click(button);

//     // expect(axios).toHaveBeenCalledWith(button);
//     // const resp = {data: bio};
//     axios.post.mockResolvedValue({
//         data: {
//             bio: "I just wrote a bio",
//         },
//     });
// });
