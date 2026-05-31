import { Action } from '@/lib/main.schema';
import { createContext, useContext } from 'react';

export interface ActionResolverContextType {
  resolver: (action: Action) => void;
}

export const ActionResolverContext = createContext<ActionResolverContextType | null>(null);

export const useActionResolverConsumer = () => {
  const resolver = useContext(ActionResolverContext);

  if (!resolver) throw new Error('Something went wrong while accessing action resolver context');
  else return resolver;
};
