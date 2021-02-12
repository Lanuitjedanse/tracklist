import ProfilePic from "./ProfilePic";
import { render } from "@testing-library/react";

// 3 tests

// when no image prop is passed the default img is used as the src
test("when no image prop is passed the default img is used as the src", () => {
    const { container } = render(<ProfilePic />);
    console.log(
        "container.querySelector(img)",
        container.querySelector("img").src
    );
    const img = container.querySelector("img");
    expect(img.src.endsWith("/avatar.png")).toBe(true);
});
// when image prop is passed that prop becomes the src img
test("when image prop is passed that prop becomes the src img", () => {
    const { container } = render(
        <ProfilePic profilePicUrl="https://www.fillmurray.com/500/500" />
    );
    const img = container.querySelector("img");
    expect(img.src).toBe("https://www.fillmurray.com/500/500");
});
// first and last become the alt of the image when passed as props
test("first and last become the alt of the image when passed as props", () => {
    const { container } = render(
        <ProfilePic firstName="Loulou" lastName="Bellou" />
    );
    const img = container.querySelector("img");
    expect(img.alt).toBe("Loulou Bellou");
});
