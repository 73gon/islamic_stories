import { useTranslation } from 'react-i18next'
import { Link, useRouterState } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings2 } from 'lucide-react'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ModeToggle } from '@/components/ui/darkmode'
import { useReaderStore } from '@/store/readerStore'
import { Ryqo } from '@/components/ryqo'
import { ReaderControls } from './ReaderControls'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Header() {
  const { t } = useTranslation()
  const focusMode = useReaderStore(
    (state: { focusMode: any }) => state.focusMode,
  )
  const router = useRouterState()
  const isDetailPage = router.location.pathname.startsWith('/prophets/')

  return (
    <header
      className={`${focusMode ? 'sticky' : 'lg:sticky'} top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Ryqo className="h-8 w-8" />
            <span className="text-lg sm:text-xl font-semibold text-foreground">
              {t('header.title')}
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <AnimatePresence mode="wait">
              {isDetailPage && (
                <>
                  {/* Desktop: Show inline controls */}
                  <motion.div
                    initial={{ opacity: 0, x: -10, width: 0 }}
                    animate={{ opacity: 1, x: 0, width: 'auto' }}
                    exit={{ opacity: 0, x: -10, width: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="hidden md:flex items-center gap-2 sm:gap-3"
                  >
                    <ReaderControls />
                    <Separator orientation="vertical" className="h-6" />
                  </motion.div>

                  {/* Mobile: Show dropdown */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="md:hidden"
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                          <Settings2 className="h-4 w-4" />
                          <span className="sr-only">Reader settings</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-auto p-3">
                        <ReaderControls />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
            <LanguageSwitcher />
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
