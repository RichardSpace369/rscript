export const resolveStyles = (cssType: 'none' | 'sass' | 'less') => {
  switch (cssType) {
    case 'sass':
      return {
        dependencies: { sass: '^1.26.10 ', 'sass-loader': '^9.0.3' },
      };
    case 'less':
      return {
        dependencies: { sass: '^1.26.11 ', 'sass-loader': '^9.0.3' },
      };
    case 'none':
      return {
        dependencies: { sass: '^1.26.12 ', 'sass-loader': '^9.0.3' },
      };
  }
};
