"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Loader2 } from "lucide-react"
import { ServicesTable } from "@/components/admin/services-table"
import { ServiceModal } from "@/components/admin/service-modal"
import type { AdminService } from "@/types/admin"
import { getServices, createService, updateService, deleteService } from "@/lib/actions/services"
import { useToast } from "@/hooks/use-toast"

export default function AdminServicesPage() {
  const [services, setServices] = useState<AdminService[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingService, setEditingService] = useState<AdminService | undefined>(undefined)
  const { toast } = useToast()

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    setLoading(true)
    const result = await getServices()

    if (result.success && result.data) {
      setServices(result.data as AdminService[])
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to fetch services",
        variant: "destructive",
      })
    }
    setLoading(false)
  }

  const handleCreate = () => {
    setEditingService(undefined)
    setModalOpen(true)
  }

  const handleEdit = (service: AdminService) => {
    setEditingService(service)
    setModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this service?")) {
      // Optimistic update
      const previousServices = [...services]
      setServices(services.filter((s) => s.id !== id))

      const result = await deleteService(id)

      if (result.success) {
        toast({
          title: "Success",
          description: "Service deleted successfully",
        })
      } else {
        // Revert on error
        setServices(previousServices)
        toast({
          title: "Error",
          description: result.error || "Failed to delete service",
          variant: "destructive",
        })
      }
    }
  }

  const handleSave = async (service: AdminService) => {
    try {
      if (editingService) {
        // Update existing
        const result = await updateService(service.id, {
          title: service.title,
          description: service.description,
          icon: service.icon,
          featured: service.featured,
        })

        if (result.success && result.data) {
          setServices(services.map((s) => (s.id === service.id ? (result.data as AdminService) : s)))
          toast({
            title: "Success",
            description: "Service updated successfully",
          })
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to update service",
            variant: "destructive",
          })
          return
        }
      } else {
        // Create new
        const result = await createService({
          title: service.title,
          description: service.description,
          icon: service.icon,
          featured: service.featured,
        })

        if (result.success && result.data) {
          setServices([result.data as AdminService, ...services])
          toast({
            title: "Success",
            description: "Service created successfully",
          })
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to create service",
            variant: "destructive",
          })
          return
        }
      }

      setModalOpen(false)
      setEditingService(undefined)
    } catch (error) {
      console.error("[Admin] Error saving service:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground mt-2">Manage your service offerings</p>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Service
        </Button>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <ServicesTable services={services} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      {/* Modal */}
      <ServiceModal open={modalOpen} onOpenChange={setModalOpen} service={editingService} onSave={handleSave} />
    </div>
  )
}
