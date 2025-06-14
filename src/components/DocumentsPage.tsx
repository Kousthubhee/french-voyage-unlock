import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileText, Plus, Bell, Calendar, AlertTriangle, CheckCircle, Clock, Trash2, UploadCloud, File as FileIcon, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/components/ui/sonner';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Info, Edit } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@/components/ui/tabs";

interface Document {
  id: string;
  name: string;
  type: string;
  submissionDate: string;
  expiryDate: string;
  status: 'valid' | 'expiring' | 'expired';
  renewalProcess: string[];
  notificationEnabled: boolean;
  notes?: string;
  file?: File | null;
  fileUrl?: string | null;
}

interface ImportantDoc {
  id: string;
  name: string;
  description: string;
  file?: File | null;
  fileUrl?: string | null;
}

export const DocumentsPage = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Student Visa',
      type: 'Immigration',
      submissionDate: '2024-01-15',
      expiryDate: '2025-01-14',
      status: 'valid',
      renewalProcess: [
        'Start renewal process 2 months before expiry',
        'Book appointment at prefecture',
        'Prepare required documents (passport, proof of enrollment, etc.)',
        'Pay renewal fees',
        'Submit application at prefecture'
      ],
      notificationEnabled: true,
      notes: 'Remember to bring original documents and copies',
      file: null,
      fileUrl: null,
    },
    {
      id: '2',
      name: 'Residence Permit',
      type: 'Immigration',
      submissionDate: '2024-01-20',
      expiryDate: '2024-05-15',
      status: 'expiring',
      renewalProcess: [
        'Begin renewal 2 months before expiry',
        'Gather required documents',
        'Schedule prefecture appointment',
        'Submit renewal application'
      ],
      notificationEnabled: true,
      notes: 'Keep proof of previous permits',
      file: null,
      fileUrl: null,
    },
    {
      id: '3',
      name: 'Housing Guarantee',
      type: 'Housing',
      submissionDate: '2024-02-10',
      expiryDate: '2025-02-09',
      status: 'valid',
      renewalProcess: [
        'Contact the guarantee service one month before expiry',
        'Provide updated tenancy agreement',
        'Submit renewal forms online',
        'Receive and store new guarantee document'
      ],
      notificationEnabled: true,
      notes: 'Vital for renting apartments; check with landlord for specific requirements.',
      file: null,
      fileUrl: null,
    },
    {
      id: '4',
      name: 'Housing Insurance',
      type: 'Insurance',
      submissionDate: '2024-02-12',
      expiryDate: '2025-02-11',
      status: 'valid',
      renewalProcess: [
        'Renew automatically with insurance provider unless cancelled',
        'Update payment details if needed',
        'Download new insurance certificate'
      ],
      notificationEnabled: true,
      notes: 'Keep receipts and certificates for your landlord and personal records.',
      file: null,
      fileUrl: null,
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newDocument, setNewDocument] = useState({
    name: '',
    type: '',
    submissionDate: '',
    expiryDate: '',
    renewalProcess: '',
    notes: '',
    file: null as null | File,
    fileUrl: null as null | string,
  });

  const [editDocId, setEditDocId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ submissionDate: string; expiryDate: string }>({
    submissionDate: '',
    expiryDate: '',
  });

  const [importantDocs, setImportantDocs] = useState<ImportantDoc[]>([]);
  const [showAddImportantDialog, setShowAddImportantDialog] = useState(false);
  const [newImportantDoc, setNewImportantDoc] = useState<{ name: string; description: string; file: null | File; fileUrl: null | string }>({
    name: "",
    description: "",
    file: null,
    fileUrl: null,
  });

  const calculateStatus = (expiryDate: string): 'valid' | 'expiring' | 'expired' => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const monthsUntilExpiry = (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30);

    if (monthsUntilExpiry < 0) return 'expired';
    if (monthsUntilExpiry < 2) return 'expiring';
    return 'valid';
  };

  const handleAddDocument = () => {
    if (!newDocument.name || !newDocument.type || !newDocument.submissionDate || !newDocument.expiryDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    const status = calculateStatus(newDocument.expiryDate);
    const newDoc: Document = {
      id: Date.now().toString(),
      ...newDocument,
      status,
      renewalProcess: newDocument.renewalProcess.split('\n').filter(step => step.trim()),
      notificationEnabled: true,
      file: newDocument.file || null,
      fileUrl: newDocument.fileUrl || null,
    };

    setDocuments([...documents, newDoc]);
    setIsAddDialogOpen(false);
    setNewDocument({ name: '', type: '', submissionDate: '', expiryDate: '', renewalProcess: '', notes: '', file: null, fileUrl: null });
    toast.success('Document added successfully');
  };

  const deleteDocument = (docId: string) => {
    setDocuments(documents.filter(doc => doc.id !== docId));
    toast.success('Document deleted successfully');
  };

  const toggleNotification = (docId: string) => {
    setDocuments(documents.map(doc => {
      if (doc.id === docId) {
        const newState = !doc.notificationEnabled;
        toast(newState ? 'Notifications enabled' : 'Notifications disabled');
        return { ...doc, notificationEnabled: newState };
      }
      return doc;
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid':
        return 'text-green-600';
      case 'expiring':
        return 'text-orange-600';
      case 'expired':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'expiring':
        return <Clock className="h-5 w-5 text-orange-600" />;
      case 'expired':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default:
        return null;
    }
  };

  // --- Document file actions ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, docId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fileUrl = URL.createObjectURL(file);
    setDocuments(docs => docs.map(doc => doc.id === docId ? { ...doc, file, fileUrl } : doc));
    toast.success('File uploaded successfully');
  };

  const handleRemoveFile = (docId: string) => {
    setDocuments(docs => docs.map(doc => doc.id === docId ? { ...doc, file: null, fileUrl: null } : doc));
  };

  // --- New document dialog file upload ---
  const handleNewDocFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {
      toast.error("Only PDF, JPG, or PNG files are allowed.");
      return;
    }
    const fileUrl = URL.createObjectURL(file);
    setNewDocument(nd => ({ ...nd, file, fileUrl }));
  };
  const handleRemoveNewDocFile = () => setNewDocument(nd => ({ ...nd, file: null, fileUrl: null }));

  // Handler to open edit dialog and preload dates
  const openEditDialog = (doc: Document) => {
    setEditDocId(doc.id);
    setEditValues({
      submissionDate: doc.submissionDate,
      expiryDate: doc.expiryDate,
    });
  };

  const closeEditDialog = () => {
    setEditDocId(null);
    setEditValues({ submissionDate: '', expiryDate: '' });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = () => {
    if (!editValues.submissionDate || !editValues.expiryDate) {
      toast.error("Both dates are required");
      return;
    }
    setDocuments(docs =>
      docs.map(doc => {
        if (doc.id === editDocId) {
          const status = calculateStatus(editValues.expiryDate);
          return {
            ...doc,
            submissionDate: editValues.submissionDate,
            expiryDate: editValues.expiryDate,
            status,
          };
        }
        return doc;
      })
    );
    toast.success("Dates updated");
    closeEditDialog();
  };

  const handleAddImportantDoc = () => {
    if (!newImportantDoc.name || !newImportantDoc.file) {
      toast.error("Please provide at least a name and a file for the document.");
      return;
    }
    const doc: ImportantDoc = {
      id: Date.now().toString(),
      name: newImportantDoc.name,
      description: newImportantDoc.description,
      file: newImportantDoc.file,
      fileUrl: newImportantDoc.fileUrl,
    };
    setImportantDocs((prev) => [...prev, doc]);
    toast.success("Important document uploaded!");
    setShowAddImportantDialog(false);
    setNewImportantDoc({ name: "", description: "", file: null, fileUrl: null });
  };

  const handleImportantFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {
      toast.error("Only PDF, JPG, or PNG files are allowed.");
      return;
    }
    const fileUrl = URL.createObjectURL(file);
    setNewImportantDoc(nd => ({ ...nd, file, fileUrl }));
  };

  const handleDeleteImportantDoc = (id: string) => {
    setImportantDocs(docs => docs.filter(doc => doc.id !== id));
    toast.success("Important document deleted!");
  };

  // Suggestions for documents (update as requested)
  const docSuggestions = [
    { name: "Residence Permit", type: "Immigration" },
    { name: "Student Visa", type: "Immigration" },
    { name: "Health Insurance", type: "Insurance" },
    { name: "Housing Guarantee", type: "Housing" },
    { name: "CAF Attestation", type: "Housing/CAF" },
    { name: "Birth Certificate", type: "Identity" },
    { name: "Bank Proof (RIB)", type: "Finance" },
    { name: "Enrollment Certificate", type: "Education" },
    { name: "OFII Certificate", type: "Immigration" },
    { name: "Social Security Number (SSN)", type: "Social Security" }
  ];

  // Function to use suggestion for regular documents
  const handleSuggestionClick = (suggestion: { name: string; type: string }) => {
    setNewDocument({
      ...newDocument,
      name: suggestion.name,
      type: suggestion.type,
    });
    setIsAddDialogOpen(true);
  };

  // Function to use suggestion for important docs
  const handleImportantSuggestionClick = (suggestion: { name: string; type: string }) => {
    setNewImportantDoc({
      ...newImportantDoc,
      name: suggestion.name,
      description: suggestion.type,
    });
    setShowAddImportantDialog(true);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <FileText className="h-8 w-8 mr-3 text-blue-600" />
          Documents & Renewals
        </h1>
        <p className="text-lg text-gray-600">
          Track your important documents, keep digital copies, and stay on top of renewal deadlines.
        </p>
      </div>

      <Tabs defaultValue="renewal" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="renewal">Documents to Renew</TabsTrigger>
          <TabsTrigger value="all">All Important Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="renewal">
          {/* Suggestions Section (for 'to renew') */}
          <div className="mb-6 flex flex-wrap gap-2 items-center">
            <span className="font-medium text-gray-700 mr-2">Quick Add:</span>
            {docSuggestions.map((s, idx) => (
              <Button
                key={idx}
                size="sm"
                variant="secondary"
                className="rounded-full px-4"
                onClick={() => handleSuggestionClick(s)}
                type="button"
              >
                {s.name}
              </Button>
            ))}
          </div>
          <div className="mb-6 flex justify-end">
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Document
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {documents.map((doc) => (
              <Card key={doc.id} className={`border-l-4 ${
                doc.status === 'valid' ? 'border-l-green-500' :
                doc.status === 'expiring' ? 'border-l-orange-500' :
                'border-l-red-500'
              }`}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 mr-3">{doc.name}</h3>
                        {getStatusIcon(doc.status)}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Type: {doc.type}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Submitted: {new Date(doc.submissionDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Expires: {new Date(doc.expiryDate).toLocaleDateString()}
                        </div>
                      </div>

                      <Accordion type="single" collapsible className="mb-2">
                        <AccordionItem value="renewal">
                          <AccordionTrigger className="font-medium text-gray-900">
                            Renewal Process
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="list-disc list-inside space-y-1">
                              {doc.renewalProcess.map((step, index) => (
                                <li key={index} className="text-sm text-gray-600">{step}</li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>

                      {doc.notes && (
                        <Accordion type="single" collapsible className="mb-2">
                          <AccordionItem value="notes">
                            <AccordionTrigger className="font-medium text-gray-900">
                              Notes
                            </AccordionTrigger>
                            <AccordionContent>
                              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">{doc.notes}</p>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      )}

                      {/* File preview section with correct info icon and upload button behavior */}
                      <div className="mt-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Label htmlFor={`file-input-${doc.id}`}>Document Scan / File:</Label>
                          {/* Info icon with tooltip (not clickable for upload) */}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span
                                  tabIndex={0}
                                  role="button"
                                  aria-label="Info about document scan upload"
                                >
                                  <Info className="h-4 w-4 text-blue-600 cursor-pointer" />
                                </span>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-xs">
                                Attach a scan or photo of your document for easy access and as backup proof.
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          {/* The input is associated by being a sibling—but we'll nest the Button within the label for best compatibility */}
                          <input
                            id={`file-input-${doc.id}`}
                            type="file"
                            accept=".pdf, image/jpeg, image/png"
                            className="hidden"
                            onChange={(e) => handleFileChange(e, doc.id)}
                          />
                          <label htmlFor={`file-input-${doc.id}`} style={{ margin: 0 }}>
                            <Button type="button" variant="outline" size="sm" asChild>
                              <span>
                                <UploadCloud className="h-4 w-4 mr-1" /> Upload
                              </span>
                            </Button>
                          </label>
                          {doc.file && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveFile(doc.id)}
                              className="text-red-600"
                            >
                              <X className="h-4 w-4" /> Remove
                            </Button>
                          )}
                        </div>
                        {doc.fileUrl && (
                          <div className="flex items-center gap-2">
                            {doc.file?.type?.startsWith("image") ? (
                              <img
                                src={doc.fileUrl}
                                alt={doc.name}
                                className="w-16 h-16 object-cover border rounded"
                              />
                            ) : (
                              <a
                                href={doc.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 underline text-blue-600"
                              >
                                <FileIcon className="h-5 w-5" />
                                {doc.file?.name ?? "View PDF"}
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {/* Edit Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-600"
                        onClick={() => openEditDialog(doc)}
                        aria-label="Edit dates"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={doc.notificationEnabled ? 'text-blue-600' : 'text-gray-400'}
                        onClick={() => toggleNotification(doc.id)}
                      >
                        <Bell className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600"
                        onClick={() => deleteDocument(doc.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className={`text-sm font-medium ${getStatusColor(doc.status)}`}>
                      Status: {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Edit Document Dates Dialog */}
          <Dialog open={!!editDocId} onOpenChange={open => !open && closeEditDialog()}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Document Dates</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-submission-date">Submission Date</Label>
                  <Input
                    id="edit-submission-date"
                    name="submissionDate"
                    type="date"
                    value={editValues.submissionDate}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit-expiry-date">Expiry Date</Label>
                  <Input
                    id="edit-expiry-date"
                    name="expiryDate"
                    type="date"
                    value={editValues.expiryDate}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={closeEditDialog}>
                    Cancel
                  </Button>
                  <Button onClick={handleEditSubmit}>
                    Save Changes
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Document</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Document Name</Label>
                  <Input
                    id="name"
                    value={newDocument.name}
                    onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
                    placeholder="e.g., Student Visa"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="type">Document Type</Label>
                  <Input
                    id="type"
                    value={newDocument.type}
                    onChange={(e) => setNewDocument({ ...newDocument, type: e.target.value })}
                    placeholder="e.g., Immigration"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="submissionDate">Submission Date</Label>
                  <Input
                    id="submissionDate"
                    type="date"
                    value={newDocument.submissionDate}
                    onChange={(e) => setNewDocument({ ...newDocument, submissionDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={newDocument.expiryDate}
                    onChange={(e) => setNewDocument({ ...newDocument, expiryDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="renewalProcess">Renewal Process (one step per line)</Label>
                  <Textarea
                    id="renewalProcess"
                    value={newDocument.renewalProcess}
                    onChange={(e) => setNewDocument({ ...newDocument, renewalProcess: e.target.value })}
                    placeholder="Step 1&#10;Step 2&#10;Step 3"
                    className="h-32"
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={newDocument.notes}
                    onChange={(e) => setNewDocument({ ...newDocument, notes: e.target.value })}
                    placeholder="Add any important notes or reminders..."
                    className="h-20"
                  />
                </div>
                <div>
                  <Label htmlFor="new-doc-file" className="flex items-center gap-2">
                    Attach File (PDF, JPG, PNG)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span tabIndex={0}>
                            <Info className="h-4 w-4 text-blue-600 cursor-pointer" aria-label="Info about file upload"/>
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs">
                          Attach a scan or photo of your document for easy access and as backup proof.
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <div className="flex items-center gap-2 mb-2">
                    <Input
                      id="new-doc-file"
                      type="file"
                      accept=".pdf, image/jpeg, image/png"
                      className="block"
                      onChange={handleNewDocFileChange}
                    />
                    {newDocument.file && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleRemoveNewDocFile}
                        className="text-red-600"
                      >
                        <X className="h-4 w-4" />
                        Remove
                      </Button>
                    )}
                  </div>
                  {newDocument.fileUrl && (
                    <div className="my-2">
                      {newDocument.file?.type?.startsWith("image") ? (
                        <img
                          src={newDocument.fileUrl}
                          alt={newDocument.name}
                          className="w-16 h-16 object-cover border rounded"
                        />
                      ) : (
                        <a
                          href={newDocument.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 underline text-blue-600"
                        >
                          <FileIcon className="h-5 w-5" />
                          {newDocument.file?.name ?? "View PDF"}
                        </a>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddDocument}>
                    Add Document
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* "All Important Documents" */}
        <TabsContent value="all">
          {/* Sensitive info warning */}
          <div className="mb-4">
            <div className="flex items-center bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded text-yellow-900 text-sm font-medium">
              <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
              Do not add anything that contains sensitive information (such as government numbers, personal ID numbers, or confidential details).
            </div>
          </div>
          {/* Suggestions Section (for 'important documents') */}
          <div className="mb-6 flex flex-wrap gap-2 items-center">
            <span className="font-medium text-gray-700 mr-2">Quick Add:</span>
            {docSuggestions.map((s, idx) => (
              <Button
                key={idx}
                size="sm"
                variant="secondary"
                className="rounded-full px-4"
                onClick={() => handleImportantSuggestionClick(s)}
                type="button"
              >
                {s.name}
              </Button>
            ))}
          </div>
          <div className="mb-6 flex justify-end">
            <Button onClick={() => setShowAddImportantDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Upload Important Document
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {importantDocs.length === 0 ? (
              <div className="text-gray-500 italic">No important documents uploaded yet.</div>
            ) : (
              importantDocs.map((doc) => (
                <Card key={doc.id}>
                  <CardContent className="p-5 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <FileIcon className="h-6 w-6 text-blue-500" />
                      <div>
                        <div className="font-semibold">{doc.name}</div>
                        {doc.description && <div className="text-xs text-gray-500">{doc.description}</div>}
                      </div>
                    </div>
                    {doc.fileUrl && (
                      <div className="flex items-center gap-2">
                        {doc.file?.type?.startsWith("image") ? (
                          <img
                            src={doc.fileUrl}
                            alt={doc.name}
                            className="w-16 h-16 object-cover border rounded"
                          />
                        ) : (
                          <a
                            href={doc.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 underline text-blue-600"
                          >
                            <FileIcon className="h-5 w-5" />
                            {doc.file?.name ?? "View PDF"}
                          </a>
                        )}
                      </div>
                    )}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-red-600 w-fit"
                      onClick={() => handleDeleteImportantDoc(doc.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          {/* Add Important Document Dialog */}
          <Dialog open={showAddImportantDialog} onOpenChange={setShowAddImportantDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Important Document</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="important-doc-name">Document Name</Label>
                  <Input
                    id="important-doc-name"
                    placeholder="e.g., Passport"
                    value={newImportantDoc.name}
                    onChange={e => setNewImportantDoc({ ...newImportantDoc, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="important-doc-desc">Description</Label>
                  <Textarea
                    id="important-doc-desc"
                    placeholder="Brief description"
                    className="h-16"
                    value={newImportantDoc.description}
                    onChange={e => setNewImportantDoc({ ...newImportantDoc, description: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="important-doc-file">Attach File (PDF, JPG, PNG)</Label>
                  <Input
                    id="important-doc-file"
                    type="file"
                    accept=".pdf, image/jpeg, image/png"
                    onChange={handleImportantFileChange}
                  />
                  {newImportantDoc.fileUrl && (
                    <div className="my-2">
                      {newImportantDoc.file?.type?.startsWith("image") ? (
                        <img
                          src={newImportantDoc.fileUrl}
                          alt={newImportantDoc.name}
                          className="w-16 h-16 object-cover border rounded"
                        />
                      ) : (
                        <a
                          href={newImportantDoc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 underline text-blue-600"
                        >
                          <FileIcon className="h-5 w-5" />
                          {newImportantDoc.file?.name ?? "View PDF"}
                        </a>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddImportantDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddImportantDoc}>
                    Upload
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
};
