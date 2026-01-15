'use client'

import { useState, useRef } from 'react'
import { Upload, X, File, Image, FileText, Eye } from 'lucide-react'

interface Step3DocumentsProps {
  documents: File[]
  onUpdate: (documents: File[]) => void
  onNext: () => void
  onBack: () => void
  onSaveDraft: () => void
}

export default function Step3Documents({
  documents,
  onUpdate,
  onNext,
  onBack,
  onSaveDraft
}: Step3DocumentsProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const maxFileSize = 10 * 1024 * 1024 // 10MB
  const maxFiles = 10
  const maxTotalSize = 50 * 1024 * 1024 // 50MB

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return Image
    if (file.type === 'application/pdf') return FileText
    return File
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const validateFile = (file: File): string | null => {
    if (file.size > maxFileSize) {
      return `File size exceeds 10MB limit`
    }
    if (documents.length >= maxFiles) {
      return `Maximum ${maxFiles} files allowed`
    }
    const totalSize = documents.reduce((sum, f) => sum + f.size, 0) + file.size
    if (totalSize > maxTotalSize) {
      return `Total size exceeds 50MB limit`
    }
    return null
  }

  const handleFiles = (files: FileList | null) => {
    if (!files) return

    const newFiles: File[] = []
    Array.from(files).forEach((file) => {
      const error = validateFile(file)
      if (!error) {
        newFiles.push(file)
        // Simulate upload progress
        setUploadProgress(prev => ({ ...prev, [file.name]: 0 }))
        setTimeout(() => {
          setUploadProgress(prev => ({ ...prev, [file.name]: 100 }))
        }, 1000)
      } else {
        alert(error)
      }
    })

    if (newFiles.length > 0) {
      onUpdate([...documents, ...newFiles])
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const removeFile = (index: number) => {
    const newFiles = documents.filter((_, i) => i !== index)
    onUpdate(newFiles)
  }

  const totalSize = documents.reduce((sum, file) => sum + file.size, 0)

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-navy mb-2">Upload Relevant Documents</h2>
        <p className="text-gray-600">
          Share any documents that support your case (optional but recommended)
        </p>
      </div>

      {/* Drag and Drop Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        }`}
      >
        <Upload className="mx-auto text-gray-400 mb-4" size={48} />
        <p className="text-lg font-semibold text-gray-900 mb-2">
          Drag and drop files here
        </p>
        <p className="text-gray-600 mb-4">or click to browse</p>
        <p className="text-sm text-gray-500">
          Supported: PDF, DOC, DOCX, JPG, PNG (Max 10MB per file)
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
      </div>

      {/* File List */}
      {documents.length > 0 && (
        <div className="mt-6 space-y-3">
          {documents.map((file, index) => {
            const Icon = getFileIcon(file)
            const progress = uploadProgress[file.name] || 100

            return (
              <div
                key={index}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
              >
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Icon className="text-gray-600" size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-sm text-gray-600">{formatFileSize(file.size)}</p>
                  {progress < 100 && (
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Eye className="text-gray-600" size={20} />
                  </button>
                  <button
                    onClick={() => removeFile(index)}
                    className="p-2 hover:bg-red-50 rounded-lg"
                  >
                    <X className="text-red-600" size={20} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Upload Stats */}
      {documents.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">
            {documents.length} of {maxFiles} files uploaded • Total size: {formatFileSize(totalSize)} of {formatFileSize(maxTotalSize)} used
          </p>
        </div>
      )}

      {/* Document Suggestions */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm font-semibold text-blue-900 mb-2">💡 Helpful documents may include:</p>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>Contracts or agreements</li>
          <li>Previous correspondence</li>
          <li>Photos or evidence</li>
          <li>Court documents</li>
          <li>ID or proof of ownership</li>
        </ul>
      </div>

      {/* Security Notice */}
      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-sm text-green-800">
          🔒 All files are encrypted and stored securely. Your privacy is protected.
        </p>
      </div>

      {/* Skip Option */}
      <div className="mt-6 text-center">
        <button
          onClick={onNext}
          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          Skip this step - You can upload documents later
        </button>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors"
        >
          Back
        </button>
        <div className="flex gap-3">
          <button
            onClick={onSaveDraft}
            className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium"
          >
            Save as Draft
          </button>
          <button
            onClick={onNext}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

