// Seed data for development and testing
import { meditationService, moonPhaseService } from '../services/firebaseService';
import { Meditation, MoonPhase } from '../types/database';

export const sampleMeditations: Omit<Meditation, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    title: 'Aries Sun + Scorpio Moon: Fierce Heart Transformation',
    description: 'A powerful practice for the passionate soul who feels deeply. Channel your warrior spirit into deep emotional healing.',
    sunSign: 'Aries',
    moonSign: 'Scorpio',
    duration: 42,
    price: 35,
    currency: 'USD',
    element: 'fire',
    intention: 'Channel your warrior spirit into deep emotional healing',
    tags: ['transformation', 'emotional-healing', 'warrior-spirit', 'deep-work'],
    featured: true,
    difficulty: 'intermediate',
    category: 'lunar-nidra',
    createdBy: 'admin',
    isActive: true,
    audioUrl: '',
    thumbnailUrl: ''
  },
  {
    title: 'Taurus Sun + Pisces Moon: Grounded Dreams Meditation',
    description: 'Perfect for the dreamer who needs grounding and stability. Root your dreams in practical manifestation.',
    sunSign: 'Taurus',
    moonSign: 'Pisces',
    duration: 38,
    price: 32,
    currency: 'USD',
    element: 'earth',
    intention: 'Root your dreams in practical manifestation',
    tags: ['grounding', 'manifestation', 'dreams', 'stability'],
    featured: false,
    difficulty: 'beginner',
    category: 'lunar-nidra',
    createdBy: 'admin',
    isActive: true,
    audioUrl: '',
    thumbnailUrl: ''
  },
  {
    title: 'Gemini Sun + Cancer Moon: Communicating from the Heart',
    description: 'Balance your quick mind with emotional depth. Learn to speak your truth with compassion.',
    sunSign: 'Gemini',
    moonSign: 'Cancer',
    duration: 35,
    price: 30,
    currency: 'USD',
    element: 'air',
    intention: 'Balance mental agility with emotional wisdom',
    tags: ['communication', 'heart-centered', 'balance', 'truth'],
    featured: false,
    difficulty: 'beginner',
    category: 'lunar-nidra',
    createdBy: 'admin',
    isActive: true,
    audioUrl: '',
    thumbnailUrl: ''
  },
  {
    title: 'Cancer Sun + Capricorn Moon: Nurturing Ambition',
    description: 'Harmonize your caring nature with your drive for success. Create from a place of love.',
    sunSign: 'Cancer',
    moonSign: 'Capricorn',
    duration: 40,
    price: 34,
    currency: 'USD',
    element: 'water',
    intention: 'Balance nurturing with achievement',
    tags: ['nurturing', 'ambition', 'success', 'balance'],
    featured: true,
    difficulty: 'intermediate',
    category: 'lunar-nidra',
    createdBy: 'admin',
    isActive: true,
    audioUrl: '',
    thumbnailUrl: ''
  },
  {
    title: 'Leo Sun + Virgo Moon: Radiant Perfectionism Release',
    description: 'Let your inner sun warm away perfectionist tendencies. Shine your light while releasing self-criticism.',
    sunSign: 'Leo',
    moonSign: 'Virgo',
    duration: 40,
    price: 33,
    currency: 'USD',
    element: 'fire',
    intention: 'Shine your light while releasing self-criticism',
    tags: ['self-love', 'perfectionism', 'radiance', 'release'],
    featured: false,
    difficulty: 'intermediate',
    category: 'lunar-nidra',
    createdBy: 'admin',
    isActive: true,
    audioUrl: '',
    thumbnailUrl: ''
  },
  {
    title: 'Virgo Sun + Sagittarius Moon: Organized Adventure',
    description: 'Perfect for the organized dreamer seeking expansion. Find freedom within structure and routine.',
    sunSign: 'Virgo',
    moonSign: 'Sagittarius',
    duration: 37,
    price: 31,
    currency: 'USD',
    element: 'earth',
    intention: 'Find freedom within structure and routine',
    tags: ['organization', 'adventure', 'freedom', 'expansion'],
    featured: false,
    difficulty: 'beginner',
    category: 'lunar-nidra',
    createdBy: 'admin',
    isActive: true,
    audioUrl: '',
    thumbnailUrl: ''
  }
];

export const sampleMoonPhases: Omit<MoonPhase, 'id' | 'createdAt'>[] = [
  {
    phase: 'new-moon',
    date: new Date('2024-01-11'),
    sign: 'Capricorn',
    description: 'A powerful time for setting intentions and planting seeds for new beginnings. The Capricorn energy supports practical goal-setting.',
    meditationRecommendations: [],
    ritualSuggestions: [
      'Write down your intentions for the lunar cycle',
      'Create a vision board',
      'Practice grounding meditation',
      'Set up a sacred space for manifestation'
    ]
  },
  {
    phase: 'full-moon',
    date: new Date('2024-01-25'),
    sign: 'Leo',
    description: 'The Leo full moon illuminates your creative power and self-expression. Time to celebrate your achievements and release what no longer serves.',
    meditationRecommendations: [],
    ritualSuggestions: [
      'Practice heart-opening meditation',
      'Write a gratitude list',
      'Release limiting beliefs through journaling',
      'Dance or move your body in celebration'
    ]
  }
];

// Function to seed the database with sample data
export const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');

    // Seed meditations
    for (const meditation of sampleMeditations) {
      await meditationService.create(meditation);
    }
    console.log(`Seeded ${sampleMeditations.length} meditations`);

    // Seed moon phases
    for (const moonPhase of sampleMoonPhases) {
      await moonPhaseService.create(moonPhase);
    }
    console.log(`Seeded ${sampleMoonPhases.length} moon phases`);

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};
