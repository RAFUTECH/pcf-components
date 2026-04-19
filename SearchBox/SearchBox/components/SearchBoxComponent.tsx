import * as React from "react";

interface SearchBoxProps {
  hintText: string;
  jsonSettings?: string;
  onChange: (value: string) => void;
}

const DEFAULT_SETTINGS = {
  colors: {
    input: {
      background: "#ffffff",
      border: "#d0d0d0",
      borderHover: "#d0d0d0",
      borderFocus: "#0000FF",
      text: "#1f1f1f",
      placeholder: "#a0a0a0",
    },
    icon: {
      default: "#666666",
      hover: "#1f1f1f",
    },
  },
  typography: {
    fontSize: "14px",
  },
  layout: {
    borderRadius: "0px",
    borderThickness: "1px",
    borderHoverThickness: "1px",
  },
};

function deepMerge<T>(defaults: T, override: unknown): T {
  if (!override || typeof override !== "object" || Array.isArray(override)) return defaults;
  const result = { ...defaults } as Record<string, unknown>;
  for (const key of Object.keys(override as object)) {
    const val = (override as Record<string, unknown>)[key];
    if (val !== null && typeof val === "object" && !Array.isArray(val) && key in result) {
      result[key] = deepMerge(result[key], val);
    } else if (val !== undefined && val !== null) {
      result[key] = val;
    }
  }
  return result as T;
}

function parseSettings(jsonSettings?: string): typeof DEFAULT_SETTINGS {
  if (!jsonSettings || jsonSettings.trim() === "" || jsonSettings.trim() === "[]") return DEFAULT_SETTINGS;
  try {
    const parsed = JSON.parse(jsonSettings);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return DEFAULT_SETTINGS;
    return deepMerge(DEFAULT_SETTINGS, parsed);
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export const SearchBoxComponent: React.FC<SearchBoxProps> = ({ hintText, jsonSettings, onChange }) => {
  const [value, setValue] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const [inputHovered, setInputHovered] = React.useState(false);
  const [clearHovered, setClearHovered] = React.useState(false);

  const s = parseSettings(jsonSettings);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  const handleClear = () => {
    setValue("");
    onChange("");
  };

  const borderColor = focused
    ? s.colors.input.borderFocus
    : inputHovered
    ? s.colors.input.borderHover
    : s.colors.input.border;

  const borderWidth = focused
    ? s.layout.borderThickness
    : inputHovered
    ? s.layout.borderHoverThickness
    : s.layout.borderThickness;

  const inputStyle = {
    background: s.colors.input.background,
    borderColor,
    borderWidth,
    boxShadow: focused ? `0 0 0 1px ${s.colors.input.borderFocus}` : "none",
    color: s.colors.input.text,
    fontSize: s.typography.fontSize,
    borderRadius: s.layout.borderRadius,
    "--rafutech-placeholder-color": s.colors.input.placeholder,
  } as React.CSSProperties;

  const iconStyle: React.CSSProperties = {
    color: clearHovered ? s.colors.icon.hover : s.colors.icon.default,
  };

  return (
    <div className="rafutech-searchbox">
      <input
        type="text"
        className="rafutech-searchbox__input"
        style={inputStyle}
        placeholder={hintText || "Rechercher ..."}
        value={value}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onMouseEnter={() => setInputHovered(true)}
        onMouseLeave={() => setInputHovered(false)}
      />
      <span className="rafutech-searchbox__icon" style={iconStyle}>
        {value ? (
          <button
            className="rafutech-searchbox__clear"
            style={{ color: iconStyle.color }}
            onClick={handleClear}
            onMouseEnter={() => setClearHovered(true)}
            onMouseLeave={() => setClearHovered(false)}
            aria-label="Vider le champ"
            tabIndex={-1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1={18} y1={6} x2={6} y2={18} />
              <line x1={6} y1={6} x2={18} y2={18} />
            </svg>
          </button>
        ) : (
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx={11} cy={11} r={8} />
            <line x1={21} y1={21} x2={16.65} y2={16.65} />
          </svg>
        )}
      </span>
    </div>
  );
};
