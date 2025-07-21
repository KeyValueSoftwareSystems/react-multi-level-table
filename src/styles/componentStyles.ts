import type { ThemeProps } from '../types/theme';

// Base styles that can be customized
export const createComponentStyles = (theme: ThemeProps = {}) => {
  const colors = theme.colors || {};
  const table = theme.table || {};
  
  return {
    // SidePanel styles
    sidePanel: {
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'fixed' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
      },
      container: {
        position: 'fixed' as const,
        top: 0,
        right: 0,
        width: '400px',
        height: '100vh',
        backgroundColor: colors.background || '#ffffff',
        borderLeft: `1px solid ${colors.borderColor || '#e0e0e0'}`,
        zIndex: 1001,
        overflowY: 'auto' as const,
        fontFamily: 'DM Sans, sans-serif',
        display: 'flex',
        flexDirection: 'column' as const,
      },
      header: {
        padding: '1.5rem',
        borderBottom: `1px solid ${colors.borderColor || '#e0e0e0'}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      title: {
        margin: 0,
        fontSize: '1.25rem',
        fontWeight: 600,
        color: colors.textColor || '#333333',
        fontFamily: 'DM Sans, sans-serif',
      },
      closeButton: {
        background: 'none',
        border: 'none',
        fontSize: '1.5rem',
        cursor: 'pointer',
        color: colors.textColor || '#333333',
        padding: '0.25rem',
        fontFamily: 'DM Sans, sans-serif',
      },
      content: {
        padding: '1.5rem',
        flex: 1,
      },
      fieldContainer: {
        marginBottom: '1.5rem',
      },
      label: {
        display: 'block',
        fontSize: '0.875rem',
        fontWeight: 500,
        color: colors.textColor || '#333333',
        marginBottom: '0.5rem',
      },
      idField: {
        fontSize: '1rem',
        color: colors.textColor || '#666666',
        padding: '0.75rem',
        backgroundColor: colors.background || '#f5f5f5',
        border: `1px solid ${colors.borderColor || '#e0e0e0'}`,
        borderRadius: '4px',
        fontFamily: 'monospace',
        cursor: 'not-allowed',
        opacity: 0.7,
      },
      footer: {
        padding: '1.5rem',
        borderTop: `1px solid ${colors.borderColor || '#e0e0e0'}`,
      },
      saveButton: {
        width: '100%',
        padding: '0.75rem 1rem',
        border: 'none',
        borderRadius: '4px',
        fontSize: '1rem',
        fontWeight: 500,
        fontFamily: 'DM Sans, sans-serif',
        transition: 'background-color 0.2s',
      },
      saveButtonEnabled: {
        backgroundColor: colors.primaryColor || '#1976d2',
        color: '#ffffff',
        cursor: 'pointer',
      },
      saveButtonDisabled: {
        backgroundColor: '#e0e0e0',
        color: '#666666',
        cursor: 'not-allowed',
      },
    },

    // RowDetailsPopup styles
    rowDetailsPopup: {
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'fixed' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      container: {
        position: 'fixed' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: colors.background || '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        zIndex: 1001,
        maxWidth: '500px',
        width: '90%',
        maxHeight: '80vh',
        overflow: 'hidden',
        fontFamily: 'DM Sans, sans-serif',
      },
      header: {
        padding: '1.5rem',
        borderBottom: `1px solid ${colors.borderColor || '#e0e0e0'}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      title: {
        margin: 0,
        fontSize: '1.25rem',
        fontWeight: 600,
        color: colors.textColor || '#333333',
        fontFamily: 'DM Sans, sans-serif',
      },
      closeButton: {
        background: 'none',
        border: 'none',
        fontSize: '1.5rem',
        cursor: 'pointer',
        color: colors.textColor || '#333333',
        padding: '0.25rem',
        fontFamily: 'DM Sans, sans-serif',
      },
      content: {
        padding: '1.5rem',
        maxHeight: '60vh',
        overflowY: 'auto' as const,
      },
      footer: {
        padding: '1rem 1.5rem',
        borderTop: `1px solid ${colors.borderColor || '#e0e0e0'}`,
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '0.75rem',
      },
      closeAction: {
        padding: '0.5rem 1rem',
        backgroundColor: 'transparent',
        color: colors.textColor || '#666666',
        border: `1px solid ${colors.borderColor || '#e0e0e0'}`,
        borderRadius: '4px',
        fontSize: '0.875rem',
        fontWeight: 500,
        cursor: 'pointer',
        fontFamily: 'DM Sans, sans-serif',
        transition: 'all 0.2s',
      },
    },

    // FilterDropdown styles
    filterDropdown: {
      container: {
        backgroundColor: colors.background || '#FFFFFF',
        color: colors.textColor || '#333333',
        borderColor: table.filter?.borderColor || '#E5E7EB',
      },
      selectedCountContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
      },
      selectedCountBadge: {
        backgroundColor: '#F3F3FF',
        color: '#5D5FEF',
        padding: '2px 8px',
        borderRadius: '12px',
        fontSize: '16px',
        fontWeight: '400',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
      },
      selectedCountNumber: {
        backgroundColor: '#5D5FEF',
        color: 'white',
        padding: '2px 6px',
        borderRadius: '8px',
        fontSize: '11px',
        fontWeight: '400',
      },
      categoryItem: {
        cursor: 'pointer',
        borderRadius: '4px',
        padding: '8px',
        transition: 'background-color 0.2s ease',
      },
      categoryItemSelected: {
        backgroundColor: '#F3F3FF',
      },
      categoryItemUnselected: {
        backgroundColor: 'transparent',
      },
      categoryName: {
        fontFamily: 'Typeface/family/text',
        fontWeight: 400,
        fontStyle: 'Regular',
        fontSize: '16px',
      },
      categoryNameSelected: {
        color: '#5D5FEF',
      },
      categoryNameUnselected: {
        color: 'inherit',
      },
      checkbox: {
        borderColor: table.filter?.borderColor || '#E5E7EB',
      },
      filterOption: {
        fontFamily: 'Typeface/family/text',
        fontWeight: 400,
        fontStyle: 'Regular',
        fontSize: 'Typeface/Size/lg',
        lineHeight: 'Typeface/line-height/line-height-500',
        letterSpacing: 'Typeface/letter-spacing/-normal',
        color: colors.textColor || '#333333',
      },
      sectionHeader: {
        borderBottom: 'none',
      },
      sectionHeaderRight: {
        borderBottom: 'none',
        display: 'flex',
        justifyContent: 'flex-end',
      },
      filterSectionContent: {
        height: '300px',
        overflowY: 'auto' as const,
      },
    },

    // ButtonGroup styles
    buttonGroup: {
      container: {
        display: 'flex',
        gap: '0.5rem',
        flexShrink: 0,
      },
      buttonContainer: {
        position: 'relative',
      },
    },

    // MultiLevelTable styles
    multiLevelTable: {
      container: {
        backgroundColor: colors.background,
      },
      searchBarContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        borderBottom: `1px solid ${colors.borderColor || '#e0e0e0'}`,
      },
      searchBarLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      },
      searchBarRight: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      },
      tableTitle: {
        margin: 0,
        fontSize: '1.5rem',
        fontWeight: 600,
        color: colors.textColor || '#333333',
        fontFamily: 'DM Sans, sans-serif',
      },
      tableSubtitle: {
        margin: '0.25rem 0 0 0',
        fontSize: '0.875rem',
        color: colors.textColor || '#666666',
        fontFamily: 'DM Sans, sans-serif',
      },
      searchInputContainer: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
      },
      searchInput: {
        padding: '0.5rem 0.75rem 0.5rem 2.5rem',
        border: `1px solid ${colors.borderColor || '#e0e0e0'}`,
        borderRadius: '4px',
        fontSize: '0.875rem',
        backgroundColor: colors.background || '#ffffff',
        color: colors.textColor || '#333333',
        fontFamily: 'DM Sans, sans-serif',
      },
      searchIcon: {
        position: 'absolute',
        left: '0.75rem',
        color: colors.textColor || '#666666',
      },
      table: {
        borderColor: table.cell?.borderColor || '#e0e0e0',
      },
    },

    // Pagination styles
    pagination: {
      container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
        borderTop: `1px solid ${colors.borderColor || '#e0e0e0'}`,
        position: 'relative' as const,
      },
      contentContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
      },
      totalItems: {
        fontSize: '0.875rem',
        color: colors.textColor || '#666666',
        fontFamily: 'DM Sans, sans-serif',
        position: 'static' as const,
      },
      navigation: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      },
      arrowButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px',
        transition: 'background-color 0.2s',
      },
      pageButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0.5rem 0.75rem',
        borderRadius: '4px',
        fontSize: '0.875rem',
        fontFamily: 'DM Sans, sans-serif',
        transition: 'all 0.2s',
      },
      pageButtonSelected: {
        backgroundColor: colors.primaryColor || '#5D5FEF',
        color: '#ffffff',
      },
      pageButtonUnselected: {
        backgroundColor: 'transparent',
        color: colors.textColor || '#333333',
      },
      pageSizeSelect: {
        position: 'relative',
        border: '1px solid #E5E5E5',
        borderRadius: '4px',
        padding: '4px 8px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.875rem',
        color: colors.textColor || '#333333',
        fontFamily: 'DM Sans, sans-serif',
      },
      pageSizeSelectDropdown: {
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0,
        width: '100%',
        height: '100%',
        cursor: 'pointer',
      },
    },

    // Popup styles
    popup: {
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'fixed' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      container: {
        backgroundColor: colors.background || '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        maxWidth: '400px',
        width: '90%',
        padding: '2rem',
        textAlign: 'center' as const,
        fontFamily: 'DM Sans, sans-serif',
      },
      title: {
        color: colors.textColor || '#333333',
        margin: '0 0 1rem 0',
        fontSize: '1.25rem',
        fontWeight: 600,
        fontFamily: 'DM Sans, sans-serif',
      },
      text: {
        color: colors.textColor || '#333333',
        margin: '0 0 1.5rem 0',
        fontSize: '1rem',
        lineHeight: 1.5,
        fontFamily: 'DM Sans, sans-serif',
      },
      buttonContainer: {
        display: 'flex',
        gap: '0.75rem',
        justifyContent: 'center',
      },
    },

    // DetailRow styles
    detailRow: {
      container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.75rem 0',
      },
      label: {
        fontSize: '16px',
        fontWeight: 500,
        color: colors.textColor || '#666666',
        fontFamily: 'DM Sans, sans-serif',
      },
      value: {
        fontSize: '16px',
        color: colors.textColor || '#333333',
        fontFamily: 'DM Sans, sans-serif',
        textAlign: 'right' as const,
        flex: 1,
        marginLeft: '1rem',
      },
    },

    // StatusBadge styles
    statusBadge: {
      base: {
        fontSize: '12px',
        fontWeight: '400',
        padding: '4px 8px',
        borderRadius: '12px',
        display: 'inline-flex',
        alignItems: 'center',
      },
    },

    // ResourceTypeDisplay styles
    resourceTypeDisplay: {
      container: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        fontWeight: '500',
        fontFamily: 'DM Sans, sans-serif',
      },
      icon: {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        fontWeight: '600',
        border: '2px solid',
      },
      iconWithImage: {
        backgroundColor: 'transparent',
        color: 'transparent',
        border: 'none',
      },
      iconWithoutImage: {
        backgroundColor: '#E3F2FD',
        color: '#5D5FEF',
        borderColor: '#BBDEFB',
      },
      image: {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        objectFit: 'cover' as const,
        objectPosition: 'center' as const,
      },
      text: {
        fontSize: '14px',
        fontWeight: '500',
        color: colors.textColor || '#333333',
        fontFamily: 'DM Sans, sans-serif',
      },
    },
  };
};

// Export a default instance for backward compatibility
export const componentStyles = createComponentStyles(); 