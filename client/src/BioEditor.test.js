console.log("testing");
import BioEditor from "./BioEditor";
import { render, waitFor, fireEvent } from "@testing-library/react";
import axios from "./Axios";

jest.mock("./Axios");

// axios.post.mockResolvedValue({
//     data: {
//         bio: "this is my bio!",
//     },
// });

test("When no bio is passed to it, an Add button is rendered.", () => {
    const { container } = render(<BioEditor bio="" />);
    const button = container.querySelector("button");
    expect(button.innerHTML).toContain("Add Bio");
});

test("When a bio is passed to it, an Edit button is rendered.", () => {
    const { container } = render(<BioEditor bio="this is my bio!" />);
    const button = container.querySelector("button");
    expect(button.innerHTML).toContain("Edit Bio");
});

test("Clicking either the Add or Edit button causes a textarea and a Save button to be rendered.", () => {
    const { container } = render(<BioEditor bio="this is my bio!" />);
    const button = container.querySelector("button");
    expect(button.innerHTML).toContain("Edit Bio");

    fireEvent.click(button);
    const textarea = container.querySelector("textarea");
    expect(textarea.innerHTML).toContain("this is my bio!");
    expect(button.innerHTML).toContain("Save Bio");
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

test("Clicking the Save button causes an ajax request.", async () => {
    const { container } = render(<BioEditor />);
    const button = container.querySelector("button");
    // expect(button.innerHTML).toBe("Save Bio");
    fireEvent.click(button);

    axios.post.mockResolvedValue({
        data: {
            bio: "I just wrote a bio",
        },
    });

    await waitFor(() => {
        const p = container.querySelector("p");
        expect(p.innerHTML).toContain("I just wrote a bio");
    });
});
