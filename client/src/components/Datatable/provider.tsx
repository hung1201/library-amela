import React from "react";

interface IDatatableProviderProps {
  children: React.ReactElement;
  filteringIsVisible: boolean;
}

interface IDatatableContext {
  menuIsVisible: boolean;
  setMenuVisible: (data: boolean) => void;
}

const DatatableContext = React.createContext<IDatatableContext>({} as any);

export const DatatableProvider = ({
  children,
  filteringIsVisible,
}: IDatatableProviderProps) => {
  const [menuIsVisible, setMenuVisible] =
    React.useState<boolean>(filteringIsVisible);

  const value = React.useMemo(() => {
    return { menuIsVisible, setMenuVisible };
  }, [menuIsVisible, setMenuVisible]);

  return (
    <DatatableContext.Provider value={value}>
      {children}
    </DatatableContext.Provider>
  );
};

export const useMenuIsVisible = () => {
  return React.useContext(DatatableContext).menuIsVisible;
};

export const useFieldsMenuDispatcher = () => {
  return React.useContext(DatatableContext).setMenuVisible;
};
