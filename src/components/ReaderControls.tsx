import { BookOpen, BookOpenCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useReaderStore } from '@/store/readerStore'
import { Separator } from './ui/separator'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

export function ReaderControls() {
  const {
    focusMode,
    fontSize,
    fontFamily,
    toggleFocusMode,
    setFontSize,
    setFontFamily,
  } = useReaderStore()

  return (
    <div className="flex items-center gap-2">
      {/* Focus Mode Toggle */}
      <Button
        variant={focusMode ? 'default' : 'outline'}
        size="sm"
        onClick={toggleFocusMode}
        className="h-8 w-8 p-0"
        aria-label="Toggle focus mode"
      >
        {focusMode ? (
          <BookOpenCheck className="h-4 w-4" />
        ) : (
          <BookOpen className="h-4 w-4" />
        )}
      </Button>

      <Separator orientation="vertical" className="h-6" />

      {/* Font Size Controls */}
      <ToggleGroup
        type="single"
        value={fontSize}
        onValueChange={(value) =>
          value && setFontSize(value as 'small' | 'medium' | 'large')
        }
        variant={'outline'}
      >
        <ToggleGroupItem
          value="small"
          aria-label="Small font"
          className="h-8 w-8 p-0"
        >
          <span className="text-xs font-semibold">A</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="medium"
          aria-label="Medium font"
          className="h-8 w-8 p-0"
        >
          <span className="text-sm font-semibold">A</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="large"
          aria-label="Large font"
          className="h-8 w-8 p-0"
        >
          <span className="text-base font-semibold">A</span>
        </ToggleGroupItem>
      </ToggleGroup>

      <Separator orientation="vertical" className="h-6" />

      {/* Serif/Sans Toggle */}
      <Button
        variant={fontFamily === 'serif' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setFontFamily(fontFamily === 'sans' ? 'serif' : 'sans')}
        className="gap-1 h-8 px-3"
        aria-label="Toggle font family"
      >
        <span className="text-xs">
          {fontFamily === 'serif' ? 'Serif' : 'Sans'}
        </span>
      </Button>
    </div>
  )
}
