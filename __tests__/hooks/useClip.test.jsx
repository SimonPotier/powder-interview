import { render, screen, act, renderHook } from "@testing-library/react";
import "@testing-library/jest-dom";
import useClip from "../../pages/hooks/useClip";

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
  ],
};

describe("UseCLip hook", () => {
  it("Has currentClip set as null by default", () => {
    const { result } = renderHook(() => useClip());
    expect(result.current.currentClip).toBe(null);
  });

  it("Has clipModalOpen set as false by default", () => {
    const { result } = renderHook(() => useClip());
    expect(result.current.clipModalOpen).toBe(false);
  });

  it("Has functions defined ", () => {
    const { result } = renderHook(() => useClip());
    expect(typeof result.current.handleCurrentClip).toBe("function");
    expect(typeof result.current.handleClipModalToggle).toBe("function");
  });

  it("Can toggle clipModal ", () => {
    const { result } = renderHook(() => useClip());
    expect(result.current.clipModalOpen).toEqual(false);
    act(() => {
      result.current.handleClipModalToggle(true);
    });
    expect(result.current.clipModalOpen).toEqual(true);
  });

  it("Can handle a currentClip selection", () => {
    const { result } = renderHook(() => useClip());
    expect(result.current.clipModalOpen).toEqual(false);
    act(() => {
      result.current.handleCurrentClip(props.clips[0]);
    });
    expect(result.current.currentClip).toEqual(props.clips[0]);
    expect(result.current.clipModalOpen).toEqual(true);
  });
});
