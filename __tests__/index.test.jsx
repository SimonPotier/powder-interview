import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Home from "../pages/index";

const props = {
  clips: [
    {
      category: "MOBA",
      video:
        "https://assets.dev.verse-core.vrse.gg/frontend-interview/ca763336-d5b8-44f4-9ec5-15807fe64163/98951058-32a3-4853-945c-371d8219e4e8/f5d4bdd0-9725-4da8-8481-c2ec93491bb5.mp4",
      image:
        "https://assets.dev.verse-core.vrse.gg/frontend-interview/ca763336-d5b8-44f4-9ec5-15807fe64163/98951058-32a3-4853-945c-371d8219e4e8/998093aa-d6a5-45b7-b8ba-fb6bc04dd3ee.jpeg",
      createdAt: 1610217922,
    },
    {
      category: "Action-adventure",
      video:
        "https://assets.dev.verse-core.vrse.gg/frontend-interview/ca763336-d5b8-44f4-9ec5-15807fe64163/2c376d23-af8c-4fa7-b592-60e806073ab3/96f4bb0480136b5ed7941e8c2f683802.mp4",
      image:
        "https://assets.dev.verse-core.vrse.gg/frontend-interview/ca763336-d5b8-44f4-9ec5-15807fe64163/2c376d23-af8c-4fa7-b592-60e806073ab3/448685ad18e0a047cacdd108b9e1a4f5.jpeg",
      createdAt: 1610433979,
    },
    {
      category: "Action-adventure",
      video:
        "https://assets.dev.verse-core.vrse.gg/frontend-interview/ca763336-d5b8-44f4-9ec5-15807fe64163/20bab77c-5896-43c3-b3e3-6515a60ea9b1.mp4",
      image:
        "https://assets.dev.verse-core.vrse.gg/frontend-interview/ca763336-d5b8-44f4-9ec5-15807fe64163/20bab77c-5896-43c3-b3e3-6515a60ea9b1.jpeg",
      createdAt: 1610681911,
    },
    {
      category: "Action-adventure",
      video:
        "https://assets.dev.verse-core.vrse.gg/frontend-interview/427fa43a-ceee-495b-be4c-c4d9b007504b/10c77e94-f6ea-474b-b3bb-5e55b1c7c773.mp4",
      image:
        "https://assets.dev.verse-core.vrse.gg/frontend-interview/427fa43a-ceee-495b-be4c-c4d9b007504b/10c77e94-f6ea-474b-b3bb-5e55b1c7c773.jpeg",
      createdAt: 1610720874,
    },
    {
      category: "MOBA",
      video:
        "https://assets.dev.verse-core.vrse.gg/frontend-interview/427fa43a-ceee-495b-be4c-c4d9b007504b/b3b4a192-a9a2-46fc-931f-e271f92bc397.mp4",
      image:
        "https://assets.dev.verse-core.vrse.gg/frontend-interview/427fa43a-ceee-495b-be4c-c4d9b007504b/b3b4a192-a9a2-46fc-931f-e271f92bc397.jpeg",
      createdAt: 1610861365,
    },
    {
      category: "MOBA",
      video:
        "https://assets.dev.verse-core.vrse.gg/frontend-interview/ca763336-d5b8-44f4-9ec5-15807fe64163/9c1d9edf-0a66-48f1-b310-2814f8409b86/1e42ff6a-cf33-48fe-87e9-d2e95ca069d7.mp4",
      image:
        "https://assets.dev.verse-core.vrse.gg/frontend-interview/ca763336-d5b8-44f4-9ec5-15807fe64163/9c1d9edf-0a66-48f1-b310-2814f8409b86/2517bdbd-9a72-4797-bccb-b741cc793e37.jpeg",
      createdAt: 1611014505,
    },
  ],
};

describe("Home", () => {
  it("renders homepage", () => {
    const { container } = render(<Home clips={props.clips} />);
    expect(container).toMatchSnapshot();
  });

  it("Renders with many differents categories", () => {
    const { container } = render(<Home clips={props.clips} />);
    expect(container.getElementsByClassName("category").length).toEqual(3);
  });

  it("Display a 'Recents' category first", () => {
    const { container } = render(<Home clips={props.clips} />);
    expect(container.getElementsByClassName("category")[0]).toHaveTextContent(
      "Recents"
    );
  });

  it("Can open a modal containing a video on image click", async () => {
    const user = userEvent.setup();
    render(<Home clips={props.clips} />);

    let modalHeading = screen.queryByTestId("modal-header");
    expect(modalHeading).not.toBeInTheDocument();

    await user.click(screen.getAllByTestId("category-clip")[0]);

    modalHeading = screen.getByTestId("modal-header");
    expect(modalHeading).toHaveTextContent("MOBA");
  });
});
