import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import App from '../src/App';
import React from "react";

describe('<App />', () => {
    test('should work', () => {
        render(<App />)

        expect(
            screen.getByText('Loqu e sea')
        ).toBeDefined();
    })
});