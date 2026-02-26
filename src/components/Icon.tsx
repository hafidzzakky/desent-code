import { 
  Table, 
  Table2,
  Armchair, 
  Sofa, 
  Monitor, 
  Lamp, 
  Flower2, 
  Box,
  LucideProps
} from 'lucide-react';

interface IconProps extends LucideProps {
  name?: string;
}

export const Icon = ({ name, ...props }: IconProps) => {
  switch (name) {
    case 'Table':
      return <Table {...props} />;
    case 'Table2':
      return <Table2 {...props} />;
    case 'Armchair':
      return <Armchair {...props} />;
    case 'Sofa':
      return <Sofa {...props} />;
    case 'Monitor':
      return <Monitor {...props} />;
    case 'Lamp':
      return <Lamp {...props} />;
    case 'Flower2':
      return <Flower2 {...props} />;
    default:
      return <Box {...props} />;
  }
};
