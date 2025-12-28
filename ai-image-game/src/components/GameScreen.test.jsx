import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import GameScreen from './GameScreen';

const mockQuestions = [
  {
    id: 1,
    category: "Test",
    description: "Hangisi AI?",
    images: [
      { id: "1", src: "img1.jpg", isAi: false },
      { id: "2", src: "img2.jpg", isAi: true },
      { id: "3", src: "img3.jpg", isAi: false },
    ],
    hint: "İpucu",
  }
];

describe('GameScreen Component', () => {
  it('Sorular ekrana geliyor mu?', () => {
    render(<GameScreen questions={mockQuestions} onFinish={() => {}} mode="normal" />);
    expect(screen.getByText(/Hangisi AI?/i)).toBeInTheDocument();
  });
});