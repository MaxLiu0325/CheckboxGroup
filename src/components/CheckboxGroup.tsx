import React, { useState, useEffect } from "react";

// 定義選項的接口
interface Option {
  label: string;
  value: string;
}

interface CheckboxGroupProps {
  options: Option[]; // 傳入的選項數組
  columns: number; // 每行顯示的列數
  defaultSelected?: string[]; // 預設選中的項目
  onChange?: (selected: string[]) => void; // 當選中項目改變時觸發的回調
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  columns,
  defaultSelected = [],
  onChange,
}) => {
  const [selected, setSelected] = useState<string[]>(defaultSelected);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  // 當點擊全選按鈕時，控制全選和取消全選的行為
  const handleSelectAll = (checked: boolean) => {
    const newSelected = checked ? options.map((option) => option.value) : [];
    setSelected(newSelected);
    setSelectAll(checked);
  };

  // 當單個選項改變時，更新選中狀態
  const handleOptionChange = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];

    setSelected(newSelected);
  };

  // 每次選中狀態改變時，通知父組件
  useEffect(() => {
    if (onChange) {
      onChange(selected);
    }
    setSelectAll(selected.length === options.length);
  }, [selected, onChange, options.length]);

  // 生成複選框的布局
  const renderOptions = () => {
    return options.map((option, index) => (
      <div
        key={option.value}
        style={{ display: "inline-block", width: `${100 / columns}%` }}
      >
        <label>
          <input
            type="checkbox"
            value={option.value}
            checked={selected.includes(option.value)}
            onChange={() => handleOptionChange(option.value)}
          />
          {option.label}
        </label>
      </div>
    ));
  };

  return (
    <div>
      {/* 全選複選框 */}
      <div style={{ marginBottom: "10px" }}>
        <label>
          <input
            type="checkbox"
            checked={selectAll}
            onChange={(e) => handleSelectAll(e.target.checked)}
          />
          全選
        </label>
      </div>

      {/* 選項列表 */}
      <div style={{ display: "flex", flexWrap: "wrap" }}>{renderOptions()}</div>
    </div>
  );
};

export default CheckboxGroup;
