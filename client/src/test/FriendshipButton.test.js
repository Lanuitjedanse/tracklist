import BioEditor from "../BioEditor";
import { render, waitFor, fireEvent } from "@testing-library/react";
import axios from "../Axios";

jest.mock("./Axios");
