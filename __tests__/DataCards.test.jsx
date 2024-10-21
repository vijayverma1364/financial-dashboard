import React from 'react';
import { render, screen } from '@testing-library/react';
import DataCards from '../src/common/DataCards';

describe('DataCards Component', () => {
  const labels = ['January', 'February', 'March'];
  const datasets = [
    { data: [1000, 2000, 3000] },
    { data: [500, 1500, 2000] }, 
    { data: [500, 500, 1000] },  
  ];

  test('renders correct month labels', () => {
    render(<DataCards labels={labels} datasets={datasets} />);
    labels.forEach(month => {
      expect(screen.getByText(month)).toBeTruthy();
    });
  });


  it('renders the correct number of data cards', () => {
    render(<DataCards labels={labels} datasets={datasets} />);
    const cards = screen.getAllByText(/Sales:/i);
    expect(cards.length).toBe(labels.length);
  });

});
