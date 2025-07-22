import React, { useState } from "react";

import { DeleteIcon, EditIcon } from "./components/icons";
import { MultiLevelTable } from "./components/MultiLevelTable";
import { getStatusStyle, tableRowTypography } from "./styles/style";
import { darkTheme, lightTheme } from "./themes";
import type { ThemeProps } from "./types/theme";
import type { ButtonConfig, Column, DataItem } from "./types/types";
import { Popup } from "../example/src/components/Popup";
import { RowDetailsPopup } from "../example/src/components/RowDetailsPopup";
import { SidePanel } from "../example/src/components/SidePanel";

import "./App.css";
import "./styles/App.css";

const data: DataItem[] = [
  {
    id: 1,
    resourceType: "Application",
    name: "web-service",
    dateTime: "12-Jun-2024, 10:30 AM",
    status: "Active",
    orchestration: "ECS",
    imageURL: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    subtext: "Production environment",
    showActionButtons: true,
    children: [
      {
        id: 101,
        resourceType: "Service",
        name: "api-gateway",
        dateTime: "12-Jun-2024, 10:30 AM",
        status: "Active",
        orchestration: "ECS",
        children: [
          {
            id: 1001,
            resourceType: "Task",
            name: "api-gateway-task-1",
            dateTime: "12-Jun-2024, 10:30 AM",
            status: "Pending",
            orchestration: "ECS",
          },
          {
            id: 1002,
            resourceType: "Task",
            name: "api-gateway-task-2",
            dateTime: "12-Jun-2024, 10:30 AM",
            status: "Processing",
            orchestration: "ECS",
          },
        ],
      },
      {
        id: 102,
        resourceType: "Database",
        name: "postgres-db",
        dateTime: "12-Jun-2024, 10:30 AM",
        status: "Active",
        orchestration: "ECS",
      },
    ],
  },
  {
    id: 2,
    resourceType: "Application",
    name: "mobile-app-backend",
    dateTime: "12-Jun-2024, 11:15 AM",
    status: "Provisioning",
    orchestration: "ECS",
    showActionButtons: false,
    children: [
      {
        id: 201,
        resourceType: "Service",
        name: "auth-service",
        dateTime: "12-Jun-2024, 11:15 AM",
        status: "Active",
        orchestration: "ECS",
        children: [
          {
            id: 2001,
            resourceType: "Task",
            name: "auth-service-task-1",
            dateTime: "12-Jun-2024, 11:15 AM",
            status: "Active",
            orchestration: "ECS",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    resourceType: "Application",
    name: "analytics-platform",
    dateTime: "12-Jun-2024, 09:45 AM",
    status: "Inactive",
    orchestration: "ECS",
    showActionButtons: true,
    children: [
      {
        id: 301,
        resourceType: "Service",
        name: "data-processor",
        dateTime: "12-Jun-2024, 09:45 AM",
        status: "Inactive",
        orchestration: "ECS",
      },
      {
        id: 302,
        resourceType: "Database",
        name: "analytics-db",
        dateTime: "12-Jun-2024, 09:45 AM",
        status: "Active",
        orchestration: "ECS",
        children: [
          {
            id: 3001,
            resourceType: "Task",
            name: "analytics-db-task-1",
            dateTime: "12-Jun-2024, 09:45 AM",
            status: "Active",
            orchestration: "ECS",
          },
          {
            id: 3002,
            resourceType: "Volume",
            name: "analytics-data-volume",
            dateTime: "12-Jun-2024, 09:45 AM",
            status: "Active",
            orchestration: "ECS",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    resourceType: "Application",
    name: "frontend-dashboard",
    dateTime: "12-Jun-2024, 08:20 AM",
    status: "Pending",
    orchestration: "ECS",
    showActionButtons: true,
  },
  {
    id: 5,
    resourceType: "Application",
    name: "notification-service",
    dateTime: "12-Jun-2024, 14:30 PM",
    status: "Active",
    orchestration: "ECS",
    showActionButtons: true,
    children: [
      {
        id: 501,
        resourceType: "Service",
        name: "email-service",
        dateTime: "12-Jun-2024, 14:30 PM",
        status: "Active",
        orchestration: "ECS",
      },
    ],
  },
  {
    id: 6,
    resourceType: "Application",
    name: "file-storage-service",
    dateTime: "12-Jun-2024, 13:45 PM",
    status: "Processing",
    orchestration: "ECS",
    showActionButtons: true,
    children: [
      {
        id: 601,
        resourceType: "Service",
        name: "storage-api",
        dateTime: "12-Jun-2024, 13:45 PM",
        status: "Inactive",
        orchestration: "ECS",
        children: [
          {
            id: 6001,
            resourceType: "Task",
            name: "storage-api-task-1",
            dateTime: "12-Jun-2024, 13:45 PM",
            status: "Inactive",
            orchestration: "ECS",
          },
        ],
      },
      {
        id: 602,
        resourceType: "Storage",
        name: "file-storage-volume",
        dateTime: "12-Jun-2024, 13:45 PM",
        status: "Active",
        orchestration: "ECS",
      },
    ],
  },
  {
    id: 7,
    resourceType: "Application",
    name: "monitoring-system",
    dateTime: "12-Jun-2024, 07:15 AM",
    status: "Active",
    orchestration: "ECS",
    showActionButtons: true
  },
  {
    id: 8,
    resourceType: "Application",
    name: "legacy-system",
    dateTime: "12-Jun-2024, 16:20 PM",
    status: "Inactive",
    orchestration: "ECS",
    showActionButtons: true,
    children: [
      {
        id: 801,
        resourceType: "Service",
        name: "legacy-api",
        dateTime: "12-Jun-2024, 16:20 PM",
        status: "Active",
        orchestration: "ECS",
      },
      {
        id: 802,
        resourceType: "Database",
        name: "legacy-db",
        dateTime: "12-Jun-2024, 16:20 PM",
        status: "Active",
        orchestration: "ECS",
        children: [
          {
            id: 8001,
            resourceType: "Task",
            name: "legacy-db-task-1",
            dateTime: "12-Jun-2024, 16:20 PM",
            status: "Active",
            orchestration: "ECS",
          },
          {
            id: 8002,
            resourceType: "Volume",
            name: "legacy-data-volume",
            dateTime: "12-Jun-2024, 16:20 PM",
            status: "Inactive",
            orchestration: "ECS",
          },
        ],
      },
    ],
  },
  {
    id: 9,
    resourceType: "Application",
    name: "ci-cd-pipeline",
    dateTime: "12-Jun-2024, 15:10 PM",
    status: "Active",
    orchestration: "ECS",
    showActionButtons: true
  },
  {
    id: 10,
    resourceType: "Redis",
    name: "load-balancer",
    dateTime: "12-Jun-2024, 12:00 PM",
    status: "Active",
    orchestration: "ECS",
    showActionButtons: true,
    children: [
      {
        id: 1001,
        resourceType: "Service",
        name: "nginx-ingress",
        dateTime: "12-Jun-2024, 12:00 PM",
        status: "Active",
        orchestration: "ECS",
      },
    ],
  },
  {
    id: 11,
    resourceType: "Application",
    name: "cache-layer",
    dateTime: "12-Jun-2024, 11:45 AM",
    status: "Active",
    orchestration: "ECS",
    imageURL: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    subtext: "High-performance cache",
    showActionButtons: true,
    children: [
      {
        id: 1101,
        resourceType: "Redis",
        name: "redis-cache",
        dateTime: "12-Jun-2024, 11:45 AM",
        status: "Inactive",
        orchestration: "ECS",
        imageURL: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      },
      {
        id: 1102,
        resourceType: "Service",
        name: "cache-api",
        dateTime: "12-Jun-2024, 11:45 AM",
        status: "Active",
        orchestration: "ECS",
        children: [
          {
            id: 11001,
            resourceType: "Task",
            name: "cache-api-task-1",
            dateTime: "12-Jun-2024, 11:45 AM",
            status: "Active",
            orchestration: "ECS",
          },
        ],
      },
    ],
  },
  {
    id: 12,
    resourceType: "Application",
    name: "message-queue",
    dateTime: "12-Jun-2024, 10:15 AM",
    status: "Active",
    orchestration: "ECS",
  },
  {
    id: 13,
    resourceType: "Application",
    name: "backup-service",
    dateTime: "12-Jun-2024, 06:30 AM",
    status: "Inactive",
    orchestration: "ECS",
    children: [
      {
        id: 1301,
        resourceType: "Service",
        name: "backup-scheduler",
        dateTime: "12-Jun-2024, 06:30 AM",
        status: "Active",
        orchestration: "ECS",
      },
      {
        id: 1302,
        resourceType: "Storage",
        name: "backup-storage",
        dateTime: "12-Jun-2024, 06:30 AM",
        status: "Active",
        orchestration: "ECS",
        children: [
          {
            id: 13001,
            resourceType: "Bucket",
            name: "backup-bucket-primary",
            dateTime: "12-Jun-2024, 06:30 AM",
            status: "Active",
            orchestration: "ECS",
          },
          {
            id: 13002,
            resourceType: "Bucket",
            name: "backup-bucket-secondary",
            dateTime: "12-Jun-2024, 06:30 AM",
            status: "Inactive",
            orchestration: "ECS",
          },
        ],
      },
    ],
  },
  {
    id: 14,
    resourceType: "Application",
    name: "security-service",
    dateTime: "12-Jun-2024, 09:00 AM",
    status: "Active",
    orchestration: "ECS",
  },
  {
    id: 15,
    resourceType: "Redis",
    name: "reporting-engine",
    dateTime: "12-Jun-2024, 14:15 PM",
    status: "Active",
    orchestration: "ECS",
    children: [
      {
        id: 1501,
        resourceType: "Service",
        name: "report-generator",
        dateTime: "12-Jun-2024, 14:15 PM",
        status: "Active",
        orchestration: "ECS",
      },
    ],
  },
  {
    id: 16,
    resourceType: "Application",
    name: "user-management",
    dateTime: "12-Jun-2024, 08:45 AM",
    status: "Active",
    orchestration: "ECS",
  },
  {
    id: 17,
    resourceType: "Application",
    name: "payment-gateway",
    dateTime: "12-Jun-2024, 13:20 PM",
    status: "Active",
    orchestration: "ECS",
  },
  {
    id: 18,
    resourceType: "Application",
    name: "content-management",
    dateTime: "12-Jun-2024, 11:30 AM",
    status: "Active",
    orchestration: "ECS",
  },
  {
    id: 19,
    resourceType: "Application",
    name: "search-engine",
    dateTime: "12-Jun-2024, 10:45 AM",
    status: "Active",
    orchestration: "ECS",
  },
  {
    id: 20,
    resourceType: "Application",
    name: "data-warehouse",
    dateTime: "12-Jun-2024, 07:30 AM",
    status: "Active",
    orchestration: "ECS",
  },
  {
    id: 21,
    resourceType: "Redis",
    name: "machine-learning-api",
    dateTime: "12-Jun-2024, 15:45 PM",
    status: "Processing",
    orchestration: "ECS",
    subtext: "AI/ML processing",
  },
  {
    id: 22,
    resourceType: "Application",
    name: "video-processing",
    dateTime: "12-Jun-2024, 16:30 PM",
    status: "Active",
    orchestration: "ECS",
  },
  {
    id: 23,
    resourceType: "Application",
    name: "real-time-analytics",
    dateTime: "12-Jun-2024, 12:15 PM",
    status: "Active",
    orchestration: "ECS",
  },
  {
    id: 24,
    resourceType: "Application",
    name: "iot-gateway",
    dateTime: "12-Jun-2024, 09:20 AM",
    status: "Active",
    orchestration: "ECS",
  },
  {
    id: 25,
    resourceType: "Application",
    name: "blockchain-service",
    dateTime: "12-Jun-2024, 14:50 PM",
    status: "Active",
    orchestration: "ECS",
  },
  {
    id: 26,
    resourceType: "Application",
    name: "chat-service",
    dateTime: "12-Jun-2024, 11:00 AM",
    status: "Active",
    orchestration: "ECS",
  },
  {
    id: 27,
    resourceType: "Application",
    name: "file-upload-service",
    dateTime: "12-Jun-2024, 13:10 PM",
    status: "Active",
    orchestration: "ECS",
  },
  {
    id: 28,
    resourceType: "Application",
    name: "email-service",
    dateTime: "12-Jun-2024, 08:30 AM",
    status: "Active",
    orchestration: "ECS",
  },
  {
    id: 29,
    resourceType: "Redis",
    name: "sms-gateway",
    dateTime: "12-Jun-2024, 10:00 AM",
    status: "Active",
    orchestration: "ECS",
  },
  {
    id: 30,
    resourceType: "Application",
    name: "push-notification",
    dateTime: "12-Jun-2024, 12:45 PM",
    status: "Active",
    orchestration: "ECS",
  },
  {
    id: 31,
    resourceType: "Application",
    name: "social-media-api",
    dateTime: "12-Jun-2024, 15:20 PM",
    status: "Active",
    orchestration: "ECS",
  },
  {
    id: 32,
    resourceType: "Application",
    name: "weather-service",
    dateTime: "12-Jun-2024, 07:45 AM",
    status: "Active",
    orchestration: "ECS",
  },
  {
    id: 33,
    resourceType: "Application",
    name: "maps-service",
    dateTime: "12-Jun-2024, 09:10 AM",
    status: "Active",
    orchestration: "ECS",
  },
  {
    id: 34,
    resourceType: "Redis",
    name: "translation-service",
    dateTime: "12-Jun-2024, 11:25 AM",
    status: "Active",
    orchestration: "ECS",
  },
  {
    id: 35,
    resourceType: "Redis",
    name: "ocr-service",
    dateTime: "12-Jun-2024, 14:05 PM",
    status: "Active",
    orchestration: "ECS",
  },
  {
    id: 36,
    resourceType: "Application",
    name: "voice-recognition",
    dateTime: "12-Jun-2024, 16:15 PM",
    status: "Active",
    orchestration: "ECS",
  },
  {
    id: 37,
    resourceType: "Application",
    name: "image-processing",
    dateTime: "12-Jun-2024, 12:30 PM",
    status: "Active",
    orchestration: "ECS",
  },
  {
    id: 38,
    resourceType: "Redis",
    name: "data-sync-service",
    dateTime: "12-Jun-2024, 08:15 AM",
    status: "Active",
    orchestration: "ECS",
  },
  {
    id: 39,
    resourceType: "Application",
    name: "audit-log-service",
    dateTime: "12-Jun-2024, 10:40 AM",
    status: "Active",
    orchestration: "ECS",
  },
  {
    id: 40,
    resourceType: "Redis",
    name: "rate-limiting-service",
    dateTime: "12-Jun-2024, 13:55 PM",
    status: "Inactive",
    orchestration: "ECS",
  },
  {
    id: 41,
    resourceType: "Application",
    name: "feature-flag-service",
    dateTime: "12-Jun-2024, 15:35 PM",
    status: "Active",
    orchestration: "ECS",
  },
  {
    id: 42,
    resourceType: "Application",
    name: "config-management",
    dateTime: "12-Jun-2024, 07:20 AM",
    status: "Active",
    orchestration: "ECS",
  },
  {
    id: 43,
    resourceType: "Application",
    name: "service-discovery",
    dateTime: "12-Jun-2024, 09:35 AM",
    status: "Active",
    orchestration: "ECS",
  },
  {
    id: 44,
    resourceType: "Redis",
    name: "circuit-breaker",
    dateTime: "12-Jun-2024, 11:50 AM",
    status: "Active",
    orchestration: "ECS",
  },
  {
    id: 45,
    resourceType: "Redis",
    name: "distributed-lock",
    dateTime: "12-Jun-2024, 14:25 PM",
    status: "Active",
    orchestration: "ECS",
  },
  {
    id: 46,
    resourceType: "Redis",
    name: "event-sourcing",
    dateTime: "12-Jun-2024, 16:40 PM",
    status: "Pending",
    orchestration: "ECS",
  },
  {
    id: 47,
    resourceType: "Application",
    name: "cqr-service",
    dateTime: "12-Jun-2024, 08:50 AM",
    status: "Active",
    orchestration: "ECS",
  },
  {
    id: 48,
    resourceType: "Application",
    name: "saga-orchestrator",
    dateTime: "12-Jun-2024, 10:55 AM",
    status: "Active",
    orchestration: "ECS",
  },
  {
    id: 49,
    resourceType: "Application",
    name: "api-versioning",
    dateTime: "12-Jun-2024, 13:40 PM",
    status: "Active",
    orchestration: "ECS",
  },
  {
    id: 50,
    resourceType: "Application",
    name: "health-check-service",
    dateTime: "12-Jun-2024, 15:50 PM",
    status: "Active",
    orchestration: "ECS",
  },
  {
    id: 51,
    resourceType: "Redis",
    name: "metrics-collector",
    dateTime: "12-Jun-2024, 07:05 AM",
    status: "Active",
    orchestration: "ECS",
  },
  {
    id: 52,
    resourceType: "Application",
    name: "log-aggregator",
    dateTime: "12-Jun-2024, 09:25 AM",
    status: "Active",
    orchestration: "ECS",
  },
  {
    id: 53,
    resourceType: "Application",
    name: "alert-manager",
    dateTime: "12-Jun-2024, 11:35 AM",
    status: "Active",
    orchestration: "ECS",
  },
  {
    id: 54,
    resourceType: "Application",
    name: "dashboard-service",
    dateTime: "12-Jun-2024, 14:15 PM",
    status: "Active",
    orchestration: "ECS",
  },
  {
    id: 55,
    resourceType: "Redis",
    name: "reporting-api",
    dateTime: "12-Jun-2024, 16:25 PM",
    status: "Processing",
    orchestration: "ECS",
  },
  {
    id: 56,
    resourceType: "Application",
    name: "data-export-service",
    dateTime: "12-Jun-2024, 08:40 AM",
    status: "Provisioning",
    orchestration: "ECS",
  }
];

const StatusCell: React.FC<{ value: string; theme: ThemeProps }> = ({
  value,
}) => {
  const style = getStatusStyle(value);
  
  return (
    <span className="status-badge" style={style}>
      {value}
    </span>
  );
};

const ResourceTypeCell: React.FC<{ 
  value: string; 
  imageURL?: string;
  subtext?: string;
}> = ({
  value,
  imageURL,
  subtext,
}) => {
  const firstLetter = value.charAt(0).toUpperCase();
  
  return (
    <div className="resource-type-container">
      <div className={`resource-type-icon ${imageURL ? 'resource-type-icon-with-image' : 'resource-type-icon-without-image'}`}>
        {imageURL ? (
          <img 
            src={imageURL} 
            alt={value}
            className="resource-type-image"
          />
        ) : (
          firstLetter
        )}
      </div>
      <div className="resource-type-content">
        <span style={tableRowTypography}>{value}</span>
        {subtext && (
          <span className="resource-type-subtext">
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
};

const ActionsCell: React.FC<{ 
  item: DataItem; 
  onDeleteClick?: (itemId: string | number, itemName: string) => void;
  onEditClick?: (item: DataItem) => void;
}> = ({
  item,
  onDeleteClick,
  onEditClick,
}) => {
  // Only show action buttons if showActionButtons is true
  if (!item.showActionButtons) return null;

  const handleEdit = () => {
    if (onEditClick) 
      onEditClick(item);
    else 
      console.log('Edit clicked for:', item.name);
    // Add your edit logic here
    
  };

  const handleDelete = () => {
    if (onDeleteClick) 
      onDeleteClick(item.id, item.name || `Item ${item.id}`);
    else 
      console.log('Delete clicked for:', item.name);
    // Add your delete logic here
    
  };

  const handleEditClick = (e?: React.MouseEvent) => {
    e?.stopPropagation(); // Prevent row click event
    handleEdit();
  };

  const handleDeleteClick = (e?: React.MouseEvent) => {
    e?.stopPropagation(); // Prevent row click event
    handleDelete();
  };

  return (
    <div className="actions-cell">
      <EditIcon 
        width={16} 
        height={16} 
        onClick={handleEditClick}
        color="#595959"
      />
      <DeleteIcon 
        width={16} 
        height={16} 
        onClick={handleDeleteClick}
        color="#595959"
      />
    </div>
  );
};

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilterValues, setSelectedFilterValues] = useState<Set<string | number>>(new Set());
  const [expandedRows, setExpandedRows] = useState<Set<string | number>>(new Set());
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());
  
  // Popup states
  const [deletePopup, setDeletePopup] = useState<{
    isOpen: boolean;
    itemId: string | number | null;
    itemName: string;
  }>({
    isOpen: false,
    itemId: null,
    itemName: '',
  });
  
  const [bulkDeletePopup, setBulkDeletePopup] = useState<{
    isOpen: boolean;
    selectedCount: number;
  }>({
    isOpen: false,
    selectedCount: 0,
  });
  
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string | number; name: string } | null>(null);
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DataItem | null>(null);
  const [showRowDetailsPopup, setShowRowDetailsPopup] = useState(false);
  const [selectedRowItem, setSelectedRowItem] = useState<DataItem | null>(null);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Hide dark mode functionality - set to false to disable
  const showDarkMode = false;

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  const handleFilterChange = (newFilterValues: Set<string | number>) => {
    setSelectedFilterValues(newFilterValues);
  };

  const handleRowToggle = (rowId: string | number) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);

      if (newSet.has(rowId)) 
        newSet.delete(rowId);
      else 
        newSet.add(rowId);
      
      return newSet;
    });
  };

  const handleDropdownToggle = (buttonId: string, isOpen: boolean) => {
    setOpenDropdowns(prev => {
      const newSet = new Set(prev);

      if (isOpen) 
        newSet.add(buttonId);
      else 
        newSet.delete(buttonId);
      
      return newSet;
    });
  };

  const handleDropdownClose = (buttonId: string) => {
    setOpenDropdowns(prev => {
      const newSet = new Set(prev);

      newSet.delete(buttonId);

      return newSet;
    });
  };

  const handleButtonClick = (button: ButtonConfig) => {
    if (button.dropdown) 
      handleDropdownToggle(button.id, !openDropdowns.has(button.id));
    else if (button.onClick) 
      button.onClick();
    
  };

  const handleSelectAll = () => {
    const newIsAllSelected = selectedRows.size !== data.length;
    const newSelectedRows = new Set<string | number>();
    
    if (newIsAllSelected) 
      data.forEach(item => newSelectedRows.add(item.id));
    
    
    setSelectedRows(newSelectedRows);
  };

  const handleRowSelect = (rowId: string | number) => {
    setSelectedRows(prev => {
      const newSet = new Set(prev);

      if (newSet.has(rowId)) 
        newSet.delete(rowId);
      else 
        newSet.add(rowId);
      
      return newSet;
    });
  };

  // Delete handlers
  const handleDeleteClick = (itemId: string | number, itemName: string) => {
    setDeletePopup({
      isOpen: true,
      itemId,
      itemName,
    });
  };

  const handleDeleteConfirm = () => {
    if (deletePopup.itemId) {
      console.log('Deleting item:', deletePopup.itemId, deletePopup.itemName);
      alert(`Item "${deletePopup.itemName}" (ID: ${deletePopup.itemId}) has been deleted!`);
      setDeletePopup({ isOpen: false, itemId: null, itemName: '' });
    }
  };

  const handleDeleteCancel = () => {
    setDeletePopup({ isOpen: false, itemId: null, itemName: '' });
  };

  const handleBulkDeleteClick = () => {
    setBulkDeletePopup({
      isOpen: true,
      selectedCount: selectedRows.size,
    });
  };

  const handleBulkDeleteConfirm = () => {
    console.log('Bulk deleting items:', Array.from(selectedRows));
    alert(`Deleted ${selectedRows.size} items!`);
    setSelectedRows(new Set());
    setBulkDeletePopup({ isOpen: false, selectedCount: 0 });
  };

  const handleBulkDeleteCancel = () => {
    setBulkDeletePopup({ isOpen: false, selectedCount: 0 });
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      console.log('Deleting item:', itemToDelete.id, itemToDelete.name);
      alert(`Item "${itemToDelete.name}" (ID: ${itemToDelete.id}) has been deleted!`);
      setShowDeletePopup(false);
      setItemToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
    setItemToDelete(null);
  };

  const handleEditClick = (item: DataItem) => {
    setSelectedItem(item);
    setShowSidePanel(true);
  };

  const handleSidePanelClose = () => {
    setShowSidePanel(false);
    setSelectedItem(null);
  };

  const handleRowClick = (row: DataItem) => {
    setSelectedRowItem(row);
    setShowRowDetailsPopup(true);
  };

  const handleRowDetailsPopupClose = () => {
    setShowRowDetailsPopup(false);
    setSelectedRowItem(null);
  };

  const columns: Column[] = [
    {
      key: 'resourceType',
      title: 'Resource Type',
      filterable: true,
      render: (value: string | number, item: DataItem) => (
        <ResourceTypeCell 
          value={value as string} 
          imageURL={item.imageURL}
          subtext={item.subtext}
        />
      ),
    },
    {
      key: 'name',
      title: 'Name',
      filterable: true,
    },
    {
      key: 'dateTime',
      title: 'Date & Time',
      filterable: true,
    },
    {
      key: "status",
      title: "Status",
      filterable: true,
      render: (value: string | number) => (
        <StatusCell value={value as string} theme={theme} />
      ),
    },
    {
      key: 'orchestration',
      title: 'Orchestration',
      filterable: true,
    },
    {
      key: 'actions',
      title: 'Actions',
      filterable: false,
      sortable: false,
      render: (_value: string | number, item: DataItem) => (
        <ActionsCell item={item} onDeleteClick={handleDeleteClick} onEditClick={handleEditClick} />
      ),
    },
  ];

  return (
    <div className="app" data-testid="app-container" style={{ backgroundColor: theme.colors?.background }}>
      <main className="app-content">
        <div
          className="table-container"
          style={{ backgroundColor: theme.colors?.background }}
        >
          <MultiLevelTable
            data={data}
            pageSize={10}
            columns={columns}
            theme={theme}
            sortable={true}
            selectable={true}
            
            // State props
            selectionState={{
              selectedRows,
              isAllSelected: selectedRows.size === data.length && data.length > 0
            }}
            searchTerm={searchTerm}
            selectedFilterValues={selectedFilterValues}
            deletePopup={deletePopup}
            bulkDeletePopup={bulkDeletePopup}
            openDropdowns={openDropdowns}
            expandedRows={expandedRows}
            
            // Handler props
            onSearchChange={handleSearchChange}
            onFilterChange={handleFilterChange}
            onDeleteClick={handleDeleteClick}
            onDeleteConfirm={handleDeleteConfirm}
            onDeleteCancel={handleDeleteCancel}
            onBulkDeleteClick={handleBulkDeleteClick}
            onBulkDeleteConfirm={handleBulkDeleteConfirm}
            onBulkDeleteCancel={handleBulkDeleteCancel}
            onDropdownToggle={handleDropdownToggle}
            onDropdownClose={handleDropdownClose}
            onButtonClick={handleButtonClick}
            onSelectAll={handleSelectAll}
            onRowSelect={handleRowSelect}
            onRowToggle={handleRowToggle}
            
            // Other props
            onRowClick={handleRowClick}
            filterColumn="status"
            searchableColumns={['resourceType', 'name', 'dateTime', 'orchestration']}
            tableTitle="Multi-Level Table Demo"
            tableSubtitle="A comprehensive table showing resource management"
            showDarkMode={showDarkMode}
            isDarkMode={isDarkMode}
            onToggleTheme={toggleTheme}
          />
        </div>
        {/* {selectedRows.size > 0 && (
          <div className="selection-info" >
            Selected rows: {Array.from(selectedRows).join(', ')}
          </div>
        )} */}
      </main>

      {/* Delete Confirmation Popup */}
      <Popup
        isOpen={showDeletePopup}
        onClose={handleCancelDelete}
        icon={() => (
          <div className="demo-icon-large">
            <DeleteIcon width={48} height={48} />
          </div>
        )}
        title="Delete Confirmation"
        text={`Are you sure you want to delete "${itemToDelete?.name}"? This action cannot be undone.`}
        buttons={[
          {
            text: 'Cancel',
            onClick: handleCancelDelete,
            variant: 'secondary',
          },
          {
            text: 'Delete',
            onClick: handleConfirmDelete,
            variant: 'primary',
          },
        ]}
        theme={theme}
      />

      {/* Side Panel */}
      <SidePanel
        isOpen={showSidePanel}
        onClose={handleSidePanelClose}
        item={selectedItem}
        theme={theme}
        isNameEditable={true}
        isDateTimeEditable={true}
        isOrchestrationEditable={true}
        isStatusEditable={false} // Status is read-only
      />

      {/* Row Details Popup */}
      <RowDetailsPopup
        isOpen={showRowDetailsPopup}
        onClose={handleRowDetailsPopupClose}
        item={selectedRowItem}
        theme={theme}
      />
    </div>
  );
};

export default App;
