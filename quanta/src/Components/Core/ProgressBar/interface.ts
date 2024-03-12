export interface ProgressBarProps  {
    variant?: 'success' | 'info' | 'default' | 'danger' | 'primary' | 'secondary' | 'dark' | 'light';
    max?: number | string;
    value?: number | string;
    size?: 'sm' | 'md' | 'lg';
}